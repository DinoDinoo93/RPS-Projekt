import requests
import json
from bs4 import BeautifulSoup

URL_SERVER = "http://localhost:3001"

ID_STORE = '62741fc2d35dc887e324bfc9'
URL_STORE = 'https://www.mlacom.si'


def scanCategories():
    categories = []
    try:
        print("Scanning categories")
        r = requests.get(URL_STORE)
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, 'html.parser')
            categoryMenu = soup.find(id="main-menu").div.ul
            for category in categoryMenu.find_all('li', recursive=False):
                categories.append(category.a.get('href'))
    except Exception as err:
        print(err)
    print("Found " + str(len(categories)) + " categories")
    return categories


def scanItems(category):
    items = []
    try:
        print("Scanning items in category: " + category)
        r = requests.get(
            URL_STORE + category + "?fset=default&page=1&pagesize=0&view=grid&sort=stock_desc")
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, 'html.parser')
            itemList = soup.find(id="items-container")
            for itemDiv in itemList.find_all('div', recursive=False):
                id = int(itemDiv.get('id').replace('item', ''))
                price = float(itemDiv.find(class_='taxedPrice').string.replace(
                    ".", "").replace(
                    ",", ".").replace("€", "").strip())
                item = {"id": id, "price": price}
                items.append(item)
    except Exception as err:
        print(err)
    print("Found " + str(len(items)) +
          " items in " + category + " category")
    return items


def scanItem(id):
    try:
        print("Scanning item with id: " + str(id))
        r = requests.get(URL_STORE + '/i_' + str(id))
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, 'html.parser')

            title = soup.find(
                class_="product-summary").find("h1").string.strip()

            descShortEl = soup.find(class_="short-desc")
            if descShortEl is None:
                descShort = ""
            else:
                descShort = str(descShortEl)

            descLongEl = soup.find(class_="long-description")
            if descLongEl is None:
                descLong = ""
            else:
                descLong = str(descLongEl)

            price = float(soup.find(class_="taxedPrice").string.replace(
                ".", "").replace(
                ",", ".").replace("€", "").strip())

            image = soup.find(class_="midPic").get('href')
            return {"id": id, "title": title, "descShort": descShort, "descLong": descLong, "price": price, "image": image}
    except Exception as err:
        print(err)


def scanForMoreInfo(items):
    itemsMoreInfo = []
    for item in items:
        itemsMoreInfo.append(scanItem(item["id"]))
    return itemsMoreInfo


def postFullItem(data):
    for item in data:
        itemTransformed = {"id_trgovine": ID_STORE,
                           "Naziv": item["title"], "Opis": item["descLong"]+item["descShort"], "Slika": item["image"]}
        r = requests.post(URL_SERVER + "/izdelek", json=itemTransformed)
        if r.status_code != 201:
            print("Error posting data to the server")
            break
        print("Posted item with id: " + str(item["id"]))


def postPriceItem(data):
    for item in data:
        itemTransformed = {"id_trgovine": ID_STORE, "Cena": item["price"]}
        r = requests.post(URL_SERVER + "/cena", json=itemTransformed)
        if r.status_code != 201:
            print("Error posting price to the server")
            break
        print("Posted item price with id: " + str(item["id"]))


def getExistingItems():
    items = []
    print("Getting all items already stored")
    r = requests.get(URL_SERVER + "/trgovina/" + ID_STORE)
    if r.status_code != 200:
        print("Error when getting data from the server")
        return items

    full = r.json()
    for item in full:
        items.append(item.id)

    return items


def scan():
    stored = getExistingItems()

    categories = scanCategories()
    items = []
    itemsFull = []

    i = 0
    for category in categories:
        items += scanItems(category)
        if i == 0:
            break
        i += 1

    for item in items:
        for store in stored:
            if item["id"] == store["id"]:
                break
        if item["id"] == store["id"]:
            itemsFull.append(item)

    itemsMoreInfo = scanForMoreInfo(items)
    postFullItem(itemsMoreInfo)

    postPriceItem(items)


scan()


# f = open("items.json", "w")
# f.write(json.dumps(items))
# f.close()
