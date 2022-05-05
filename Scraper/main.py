import requests
import json
from bs4 import BeautifulSoup

url = 'https://www.mlacom.si'


def scanCategories():
    categories = []
    try:
        r = requests.get(url)
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, 'html.parser')
            categoryMenu = soup.find(id="main-menu").div.ul
            for category in categoryMenu.find_all('li', recursive=False):
                categories.append(category.a.get('href'))
    except Exception as err:
        print(err)
    return categories


def scanItems(category):
    items = []
    try:
        r = requests.get(
            url + category + "?fset=default&page=1&pagesize=0&view=grid&sort=stock_desc")
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
    return items


def scanItem(id):
    try:
        r = requests.get(url + '/i_' + str(id))
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
                ",", ".").replace("€", "").strip())

            image = soup.find(class_="midPic").get('href')
            return {"title": title, "descShort": descShort, "descLong": descLong, "price": price, "image": image}
    except Exception as err:
        print(err)


#categories = scanCategories()
#items = []

#i = 0
# for category in categories:
#    items = items + scanItems(category)
#    if i == 1:
#        break
#    i += 1

#f = open("items.json", "w")
# f.write(json.dumps(items))
# f.close()

#id = 2838210
#title, price, image = scanItem(id)

# print(title)
# print(price)
# print(image)
print(scanItem(2805887))
