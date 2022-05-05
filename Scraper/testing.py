import cloudscraper
import json

scraper = cloudscraper.create_scraper()

url = "https://www.mimovrste.com/web-gateway/graphql"

# scraper.post()

id = 1411197

payload = {"operationName":"getProductVariantsByIdsForGtm","variables":{"withGifts":True,"withBundles":True,"ids":[str(id)]},"query":"query getProductVariantsByIdsForGtm($ids: [ID!]!, $withGifts: Boolean = false, $withBundles: Boolean = false) {\n  products: getProductVariantsByIds(ids: $ids) {\n    id\n    title\n    division\n    productTypeId\n    rank {\n      count\n      rank\n      __typename\n    }\n    mainCategoryUrlKey\n    mainMenuUrlKey\n    variants {\n      brief\n      id\n      title\n      labels\n      price\n      vatRate\n      discountPrice\n      priceRrp\n      priceType\n      rrpSavePercent\n      defaultActualPrice\n      discountPromotionPrice\n      mainMenuPath\n      availableOutlets\n      availability {\n        ...productAvailabilityFragment\n        __typename\n      }\n      estimatedDeliveries {\n        ...productEstimatedDeliveryFragment\n        __typename\n      }\n      brand {\n        title\n        __typename\n      }\n      mediaIds\n      variantUrl\n      isAvailable\n      giftDetails @include(if: $withGifts) {\n        variants {\n          count\n          variant {\n            price\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      bundles @include(if: $withBundles) {\n        ... on BaseProductBundle {\n          type\n          variants {\n            id\n            yearsNumber\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    marketplace {\n      marketplacePartnerTitle\n      marketplacePartnerId\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment productAvailabilityFragment on ProductAvailability {\n  key\n  status\n  countMall\n  countOutlets\n  countSupplier\n  countExternal\n  countShowrooms\n  isAvailable\n  showrooms {\n    id\n    count\n    __typename\n  }\n  __typename\n}\n\nfragment productEstimatedDeliveryFragment on EstimatedDelivery {\n  home {\n    name\n    deliveryFrom\n    deliveryTo\n    locality\n    totalPrice\n    __typename\n  }\n  pup {\n    name\n    deliveryFrom\n    deliveryTo\n    locality\n    totalPrice\n    type\n    __typename\n  }\n  cac {\n    name\n    deliveryFrom\n    deliveryTo\n    locality\n    totalPrice\n    type\n    __typename\n  }\n  __typename\n}\n"}

res = scraper.post(url, json=payload)

try:
    res = res.json()
except:
    print("Cloudflare me je zalotil")
    quit()

print("Izdelek: " + res["data"]["products"][0]["variants"][0]["title"])
print("Dejanska cena: " + str(res["data"]["products"][0]["variants"][0]["defaultActualPrice"]))
print("Fake cena: " + str(res["data"]["products"][0]["variants"][0]["priceRrp"]))