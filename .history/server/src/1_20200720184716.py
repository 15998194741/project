from tgasdk import *

batchConsumer = BatchConsumer(server_uri='http://103.210.21.117:8992', appid='f5901eb9ce6f4381bf476d804a36a984',
                              compress=True)
ta = TGAnalytics(batchConsumer)
properties = {"regtime": "regtime123",
              "palform": "palform123",
              "update_time": "update_time123",
              "serverid": "123123",
              "channel": "channel123",
              "machine": "machine123",
              "level": "level123",
              "vip_level": "vip_level123",
              "role_name": "role_name123",
              "sum_recharge": "sum_recharge123",
              "servername": "servername123",
              "roleid": "roleid123"}
ta.user_setOnce(account_id='123456', distinct_id='789456', properties=properties)
ta.flush()
ta.close()