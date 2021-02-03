import time
from flask import Flask, render_template, abort, url_for, json, jsonify, Response, request
from flask_cors import CORS
from flask_pymongo import PyMongo
import json
import html
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
from util.modelling import preprocess_data, select_model
import operator

app = Flask(__name__)
CORS(app)
mongo = PyMongo(app, uri="mongodb://localhost:27017/CrunchbaseCompanies")
collectionAll = mongo.db.All
collectionPortolio = mongo.db.Portfolio

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["CrunchbaseCompanies"]

# read file
@app.route("/Myportfolio", methods=['POST'])
def post_data():
    uuid = request.json.get("uuid")
    name = request.json.get("name")
    CL = request.json.get("Category List")
    country_code_original = request.json.get("country_code_original")
    country_continent_name = request.json.get("country_continent_name")
    total_funding_usd = request.json.get("total_funding_usd")
    latest_round = request.json.get("latest_round")
    VGR = request.json.get("VGR")

    item = {
        "uuid": uuid,
        "name": name,
        "Category List": CL,
        "country_code_original": country_code_original,
        "country_continent_name": country_continent_name,
        "total_funding_usd": total_funding_usd,
        "latest_round": latest_round,
        "VGR": VGR,
        "is_category_Artificial Intelligence": request.json.get("is_category_Artificial Intelligence"),
        "is_category_Data and Analytics": request.json.get("is_category_Data and Analytics"),
        "is_category_Financial Services": request.json.get("is_category_Financial Services"),
        "is_category_Lending and Investments": request.json.get("is_category_Lending and Investments"),
        "is_category_Payments": request.json.get("is_category_Payments"),
        "is_category_Platforms": request.json.get("is_category_Platforms"),
        "is_category_Privacy and Security": request.json.get("is_category_Privacy and Security")
    }
    collectionPortolio.insert_one(item)
    return jsonify(data="create response")


@app.route("/model/single_pred", methods=['POST'])
def serve_model():
    model_id, model = select_model(request.form)
    X = preprocess_data(request.form, model_id)
    y_hat = model.predict(X)[0]
    idx, confidence = max(enumerate(y_hat), key=operator.itemgetter(1))

    roi_cat = [
        '< 0%',
        '0 - 10%',
        '10 - 60%',
        '> 60%'
    ]

    return json.dumps({
        'category': roi_cat[idx],
        'confidence': confidence
    })


@app.route("/database")
def home_page():
    # online_users = mydb.All.find_one({}, {'_id': False})
    online_users = collectionAll.find_one({}, {'_id': False})
    # data = list(mydb.All.find({'has_parent': "TRUE"}))
    data = list(collectionAll.find())
    for users in data:
        users["_id"] = str(users["_id"])
    # return data

    return Response(
        response=json.dumps(data),
        status=500,
        mimetype="application/json"
    )
    # json.dumps(cursor.next)


@app.route("/delete/<id>", methods=["DELETE"])
def delete_company(id):
    dbResponse = collectionPortolio.delete_one({"_id": ObjectId(id)})
    return Response(
        response=json.dumps(
            {"message": "company deleted",
             "id": f"{id}"}),
        status=200,
        mimetype="application/json"
    )


@app.route("/portfolio")
def portfolio_page():
    # online_users = mydb.All.find_one({}, {'_id': False})
    # data = list(mydb.All.find({'has_parent': "TRUE"}))
    data = list(collectionPortolio.find())
    for users in data:
        users["_id"] = str(users["_id"])
    # return data

    return Response(
        response=json.dumps(data),
        status=500,
        mimetype="application/json"
    )


@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/company/<string:id>')
def get_company(id):
    # get company info from db using id
    # change parameter type to uuid or string
    test = 'blah'
    company = collectionAll.find_one_or_404({'uuid': id})
    vgr_fRound = [
        'roi_pre_pred',
        'roi_A_pred',
        'roi_B_pred',
        'roi_C_pred'
    ]
    lfr = company['latest_round']
    vgr = company[vgr_fRound[funding_int(lfr)]] if (funding_int(
        lfr) > -1 and funding_int(lfr) < 4 and company['is_closed'] == "0") else ""
    vgr_s = vgr_str(vgr)
    vgr_prob = float(company['Probability']
                     ) if company['Probability'] != "" else 0
    # list generation
    sl_list_index = [None, None, None, None]
    sl_diff = [None, None, None, None]
    companies = list(collectionAll.find(
        {'has_parent': "FALSE", 'latest_round': lfr, 'VGR': vgr_str_db(vgr)}))
    pin = -1
    nin = -1
    if vgr_prob != 0:
        if companies:
            for k in range(len(companies)):
                if companies[k]['uuid'] == id:
                    continue
                elif companies[k]['Probability'] != "":
                    diff = float(companies[k]['Probability']) - vgr_prob
                    if diff > 0:
                        if (pin < 0):
                            pin = k
                            sl_diff[0] = sl_diff[1] = diff
                    else:
                        if (nin < 0):
                            nin = k
                            sl_diff[2] = sl_diff[3] = diff
                if (pin >= 0 and nin >= 0):
                    break
            if pin >= 0:
                sl_list_index[0] = sl_list_index[1] = pin
            if nin >= 0:
                sl_list_index[2] = sl_list_index[3] = nin
            for i in range(len(companies)):
                if companies[i]['uuid'] == id:
                    continue
                prob = companies[i]['Probability']
                if prob == "":
                    continue
                else:
                    d = float(prob) - vgr_prob
                    if d > 0 and pin >= 0:
                        if d < sl_diff[1]:
                            test = 'yes'
                            sl_list_index[1] = i
                            sl_diff[1] = d
                        elif d < sl_diff[0]:
                            sl_list_index[0] = i
                            sl_diff[0] = d
                    elif d <= 0 and nin >= 0:
                        if d > sl_diff[2]:
                            sl_list_index[2] = i
                            sl_diff[2] = d
                        elif d > sl_diff[3]:
                            sl_list_index[3] = i
                            sl_diff[3] = d

    sl_list = [None, None, None, None]
    for i in range(len(sl_list_index)):
        if i < 2:
            if sl_list_index[i] != None and pin >= 0:
                sl_list[i] = companies[sl_list_index[i]]
        else:
            if sl_list_index[i] != None and nin >= 0:
                sl_list[i] = companies[sl_list_index[i]]

    return {'uuid': company['uuid'],
            'name': company['name'],
            'description': "Credit Card Payements Application",
            'cb_link': company['cb_url'],
            'dm_link': company['homepage_url'] if company['has_domain'] == "TRUE" else "",
            'tFunding': round(float(company['total_funding_usd'])/1000000, 3),
            'fundingRound': lfr if company['is_closed'] == '0' else 'Closed',
            'roi': vgr_s,
            'graphData': [
                {
                    'time': "Pre-Series",
                    'val': round(float(company['PreSeries_post_money_valuation_usd_augmented'])/1000000, 2) if company['PreSeries_post_money_valuation_usd_augmented'] != "" else None,
                    # round(float(company['roi_from_PS_to_RA']), 2) if company['roi_from_PS_to_RA'] != "" else None
                    'roi': None
                },
                # {
                #    'time': "q",
                #    'val': None,
                #    'roi': round(float(company['roi_from_PS_to_RA']), 2) if company['roi_from_PS_to_RA']!="" else 0
                # },
                {
                    'time': "Series A",
                    'val': round(float(company['RoundA_post_money_valuation_usd_augmented'])/1000000, 2) if company['RoundA_post_money_valuation_usd_augmented'] != "" else None,
                    # round(float(company['roi_from_RA_to_RB']), 2) if company['roi_from_RA_to_RB'] != "" else None
                    'roi': round(float(company['roi_from_PS_to_RA']), 2) if company['roi_from_PS_to_RA'] != "" else None
                },
                # {
                #    'time': "e",
                #    'val': 0,
                #    'roi': round(float(company['roi_from_RA_to_RB']), 2) if company['roi_from_RA_to_RB']!="" else 0
                # },
                {
                    'time': "Series B",
                    'val': round(float(company['RoundB_post_money_valuation_usd_augmented'])/1000000, 2) if company['RoundB_post_money_valuation_usd_augmented'] != "" else None,
                    # round(float(company['roi_from_RB_to_RC']), 2) if company['roi_from_RB_to_RC'] != "" else None
                    'roi': round(float(company['roi_from_RA_to_RB']), 2) if company['roi_from_RA_to_RB'] != "" else None
                },
                # {
                #    'time': "w",
                #    'val': 0,
                #   'roi': round(float(company['roi_from_RB_to_RC']), 2) if company['roi_from_RB_to_RC']!="" else 0
                # },
                {
                    'time': "Series C",
                    'val': round(float(company['RoundC_post_money_valuation_usd_augmented'])/1000000, 2) if company['RoundC_post_money_valuation_usd_augmented'] != "" else None,
                    # round(float(company['roi_from_RC_to_RD']), 2) if company['roi_from_RC_to_RD'] != "" else None
                    'roi': round(float(company['roi_from_RB_to_RC']), 2) if company['roi_from_RB_to_RC'] != "" else None
                },
                # {
                #    'time': "c",
                #    'val': 0,
                #    'roi': round(float(company['roi_from_RC_to_RD']), 2) if company['roi_from_RC_to_RD']!="" else None
                # },
                {
                    'time': "Series D",
                    'val': round(float(company['RoundD_post_money_valuation_usd_augmented'])/1000000, 2) if company['RoundD_post_money_valuation_usd_augmented'] != "" else None,
                    # round(float(company['roi_from_RD_to_IPO']), 2) if company['roi_from_RD_to_IPO'] != "" else None
                    'roi': round(float(company['roi_from_RC_to_RD']), 2) if company['roi_from_RC_to_RD'] != "" else None
                },
    ],
        'listData': [
                {
                    'uuid': sl_list[0]['uuid'] if (sl_list[0] != None) else "",
                    'name': sl_list[0]['name'] if (sl_list[0] != None) else "",
                    'type': sl_list[0]['Category List'] if (sl_list[0] != None) else "",
                    'region': sl_list[0]['country_continent_name'] if (sl_list[0] != None) else "",
                    'valuation': "1000000000",
                    'roi': vgr_s,
                    'phase': lfr,
                    'prob': round(float(sl_list[0]['Probability'])*100, 2) if (sl_list[0] != None) else "",
                },
                {
                    'uuid': sl_list[1]['uuid'] if (sl_list[1] != None) else "",
                    'name': sl_list[1]['name'] if (sl_list[1] != None) else "",
                    'type': sl_list[1]['Category List'] if (sl_list[1] != None) else "",
                    'region': sl_list[1]['country_continent_name'] if (sl_list[1] != None) else "",
                    'valuation': "1000000000",
                    'roi': vgr_s,
                    'phase': lfr,
                    'prob': round(float(sl_list[1]['Probability'])*100, 2) if (sl_list[1] != None) else "",
                },
                {
                    'uuid': id,
                    'name': company['name'],
                    'type': company['Category List'],
                    'region': company['country_continent_name'],
                    'valuation': "1000000000",
                    'roi': vgr_s,
                    'phase': lfr,
                    'prob': round(float(vgr_prob)*100, 2) if vgr_prob != 0 else ""
                },
                {
                    'uuid': sl_list[2]['uuid'] if (sl_list[2] != None) else "",
                    'name': sl_list[2]['name'] if (sl_list[2] != None) else "",
                    'type': sl_list[2]['Category List'] if (sl_list[2] != None) else "",
                    'region': sl_list[2]['country_continent_name'] if (sl_list[2] != None) else "",
                    'valuation': "1000000000",
                    'roi': vgr_s,
                    'phase': lfr,
                    'prob': round(float(sl_list[2]['Probability'])*100, 2) if (sl_list[2] != None) else "",
                },
                {
                    'uuid': sl_list[3]['uuid'] if (sl_list[3] != None) else "",
                    'name': sl_list[3]['name'] if (sl_list[3] != None) else "",
                    'type': sl_list[3]['Category List'] if (sl_list[3] != None) else "",
                    'region': sl_list[3]['country_continent_name'] if (sl_list[3] != None) else "",
                    'valuation': "1000000000",
                    'roi': vgr_s,
                    'phase': lfr,
                    'prob': round(float(sl_list[3]['Probability'])*100, 2) if (sl_list[3] != None) else "",
                }
    ]
    }


def funding_int(fRound):
    if fRound == "Closed":
        return -1
    elif fRound == "Pre-Series":
        return 0
    elif fRound == "A":
        return 1
    elif fRound == "B":
        return 2
    elif fRound == "C":
        return 3
    elif fRound == "D":
        return 4
    elif fRound == "Acquired" or fRound == "IPO":
        return 5


def region_int(reg):
    if reg == "USA":
        return 0
    elif reg == "Americas":
        return 1
    elif reg == "Asia":
        return 2
    elif reg == "Europe":
        return 3
    else:
        return 4


def vgr_str(bin):
    if bin == "0":
        return "< 0%"
    elif bin == "1":
        return "0 - 10%"
    elif bin == "2":
        return "> 10%"
    # elif bin == "3":
    #    return "> 60%"
    else:
        return ""


def vgr_str_db(bin):
    if bin == "0":
        return "<0"
    elif bin == "1":
        return "0 - 10"
    elif bin == "2":
        return ">10"
    else:
        return ""


@app.route('/api', methods=['GET'])
def api():
    return {
        'userId': 1,
        'title': "Flask React Application.",
        'completed': False
    }


@app.route('/piechart', methods=['GET'])
def piechart():
    return {
        'labels': [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        'series': [
            70, 50, 40, 30, 80, 100
        ]
    }


@app.route('/dashboard', methods=['POST'])
def get_dashboard():
    req = request.get_json()
    #model = request.args.get('model')
    #round = request.args.get('round')
    model = req['model']
    round = req['round']
    data = list(collectionAll.find())
    heatData = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [
        0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
    blData = [
        [  # region
            [0, 0, 0, 0, 0],  # success
            [0, 0, 0, 0, 0]  # age
        ],
        [  # category
            [0, 0, 0, 0, 0, 0, 0],  # success
            [0, 0, 0, 0, 0, 0, 0]  # age
        ]
    ]
    totalComp = [
        [40271, 5497, 11611, 20177, 9761],  # total companies by region
        [13243, 33947, 40327, 11124, 8034, 7770, 11437]  # total companies by cat
    ]
    #5046, 367, 1128, 1547, 145
    #2037, 4432, 2970, 739, 884, 390, 1366
    round_age_labels = [
        'PreSeries_from_founded',
        'RoundA_from_founded',
        'RoundB_from_founded',
        'RoundC_from_founded',
        'RoundD_from_founded',
    ]
    totalComp_a = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
    for company in data:
        if funding_int(company['latest_round']) >= round:
            reg = region_int(company['country_continent_name'])
            age = 0
            inc = 0
            if (round < 5):
                if(company[round_age_labels[round]] != ""):
                    age = float(company[round_age_labels[round]])/365.242199
                    blData[0][1][reg] += age
                    totalComp_a[0][reg] += 1
                    inc = 1

            blData[0][0][reg] += 1
            if company['is_category_Artificial Intelligence'] == "1":
                heatData[0][reg] += 1
                blData[1][0][0] += 1
                blData[1][1][0] += age
                totalComp_a[1][0] += inc
            if company['is_category_Data and Analytics'] == "1":
                heatData[1][reg] += 1
                blData[1][0][1] += 1
                blData[1][1][1] += age
                totalComp_a[1][1] += inc
            if company['is_category_Financial Services'] == "1":
                heatData[2][reg] += 1
                blData[1][0][2] += 1
                blData[1][1][2] += age
                totalComp_a[1][2] += inc
            if company['is_category_Lending and Investments'] == "1":
                heatData[3][reg] += 1
                blData[1][0][3] += 1
                blData[1][1][3] += age
                totalComp_a[1][3] += inc
            if company['is_category_Payments'] == "1":
                heatData[4][reg] += 1
                blData[1][0][4] += 1
                blData[1][1][4] += age
                totalComp_a[1][4] += inc
            if company['is_category_Platforms'] == "1":
                heatData[5][reg] += 1
                blData[1][0][5] += 1
                blData[1][1][5] += age
                totalComp_a[1][5] += inc
            if company['is_category_Privacy and Security'] == "1":
                heatData[6][reg] += 1
                blData[1][0][6] += 1
                blData[1][1][6] += age
                totalComp_a[1][6] += inc

    for i in range(len(blData)):
        for j in range(len(blData[i])):
            for k in range(len(blData[i][j])):
                if (j == 0):
                    blData[i][j][k] = (blData[i][j][k]/totalComp[i][k])*100
                if (j == 1):
                    if (round < 5):
                        blData[i][j][k] = blData[i][j][k] / \
                            totalComp_a[i][k] if totalComp_a[i][k] != 0 else None
                    elif (round == 5):
                        blData[i][j][k] = None

    # for i in range(len(blData)):
    #    for j in range(len(blData[i])):
    #        for k in range(len(blData[i][j])):
    #            if j==0:
    #                if i==0:
    #                    for l in range(len(heatData)):
    #                        blData[i][j][k] += heatData[l][k]
    #                if i==1:
    #                    for l in range(len(heatData[k])):
    #                        blData[i][j][k] += heatData[k][l]
    #                blData[i][j][k] = (blData[i][j][k]/totalComp[i][k])*100

    return {'title': "Dashboard",
            'barline': [
                [
                    {
                        'time': "USA",
                        'val': blData[0][0][0],
                        'roi': blData[0][1][0]
                    },
                    {
                        'time': "Americas",
                        'val': blData[0][0][1],
                        'roi': blData[0][1][1]
                    },
                    {
                        'time': "Asia",
                        'val': blData[0][0][2],
                        'roi': blData[0][1][2]
                    },
                    {
                        'time': "Europe",
                        'val': blData[0][0][3],
                        'roi': blData[0][1][3]
                    },
                    {
                        'time': "Others",
                        'val': blData[0][0][4],
                        'roi': blData[0][1][4]
                    }
                ],
                [
                    {
                        'time': "Artificial Intelligence",
                        'val': blData[1][0][0],
                        'roi': blData[1][1][0]
                    },
                    {
                        'time': "Data and Analytics",
                        'val': blData[1][0][1],
                        'roi': blData[1][1][1]
                    },
                    {
                        'time': "Financial Services",
                        'val': blData[1][0][2],
                        'roi': blData[1][1][2]
                    },
                    {
                        'time': "Lending and Investments",
                        'val': blData[1][0][3],
                        'roi': blData[1][1][3]
                    },
                    {
                        'time': "Payments",
                        'val': blData[1][0][4],
                        'roi': blData[1][1][4]
                    },
                    {
                        'time': "Platforms",
                        'val': blData[1][0][5],
                        'roi': blData[1][1][5]
                    },
                    {
                        'time': "Privacy and Security",
                        'val': blData[1][0][6],
                        'roi': blData[1][1][6]
                    }
                ]
            ],
            'heatmap': {
                # 'title': "Successful Startups: Region vs Category",
                'data': [
                    [
                        {
                            'name': "Artificial Intelligence",
                            'data': [
                                {'x': 'USA', 'y': heatData[0][0]},
                                {'x': 'Americas', 'y': heatData[0][1]},
                                {'x': 'Asia', 'y': heatData[0][2]},
                                {'x': 'Europe', 'y': heatData[0][3]},
                                {'x': 'Others', 'y': heatData[0][4]}
                            ]
                        },
                        {
                            'name': "Data and Analytics",
                            'data': [
                                {'x': 'USA', 'y': heatData[1][0]},
                                {'x': 'Americas', 'y': heatData[1][1]},
                                {'x': 'Asia', 'y': heatData[1][2]},
                                {'x': 'Europe', 'y': heatData[1][3]},
                                {'x': 'Others', 'y': heatData[1][4]}
                            ]
                        },
                        {
                            'name': "Financial Services",
                            'data': [
                                {'x': 'USA', 'y': heatData[2][0]},
                                {'x': 'Americas', 'y': heatData[2][1]},
                                {'x': 'Asia', 'y': heatData[2][2]},
                                {'x': 'Europe', 'y': heatData[2][3]},
                                {'x': 'Others', 'y': heatData[2][4]}
                            ],
                        },
                        {
                            'name': "Lending and Investments",
                            'data': [
                                {'x': 'USA', 'y': heatData[3][0]},
                                {'x': 'Americas', 'y': heatData[3][1]},
                                {'x': 'Asia', 'y': heatData[3][2]},
                                {'x': 'Europe', 'y': heatData[3][3]},
                                {'x': 'Others', 'y': heatData[3][4]}
                            ],
                        },
                        {
                            'name': "Payments",
                            'data': [
                                {'x': 'USA', 'y': heatData[4][0]},
                                {'x': 'Americas', 'y': heatData[4][1]},
                                {'x': 'Asia', 'y': heatData[4][2]},
                                {'x': 'Europe', 'y': heatData[4][3]},
                                {'x': 'Others', 'y': heatData[4][4]}
                            ],
                        },
                        {
                            'name': "Platforms",
                            'data': [
                                {'x': 'USA', 'y': heatData[5][0]},
                                {'x': 'Americas', 'y': heatData[5][1]},
                                {'x': 'Asia', 'y': heatData[5][2]},
                                {'x': 'Europe', 'y': heatData[5][3]},
                                {'x': 'Others', 'y': heatData[5][4]}
                            ],
                        },
                        {
                            'name': "Privacy and Security",
                            'data': [
                                {'x': 'USA', 'y': heatData[6][0]},
                                {'x': 'Americas', 'y': heatData[6][1]},
                                {'x': 'Asia', 'y': heatData[6][2]},
                                {'x': 'Europe', 'y': heatData[6][3]},
                                {'x': 'Others', 'y': heatData[6][4]}
                            ],
                        }
                    ],
                    [
                        {
                            'name': "Artificial Intelligence",
                            'data': [
                                {'x': 'USA', 'y': round},
                                {'x': 'Canada', 'y': len(data)/100},
                                {'x': 'China', 'y': region_int('qwe')},
                                {'x': 'Great Britain', 'y': 78},
                                {'x': 'India', 'y': 34},
                                {'x': 'Others', 'y': 67}
                            ]
                        },
                        {
                            'name': "Data and Analytics",
                            'data': [
                                {'x': 'USA', 'y': 23},
                                {'x': 'Canada', 'y': 67},
                                {'x': 'China', 'y': 33},
                                {'x': 'Great Britain', 'y': 98},
                                {'x': 'India', 'y': 11},
                                {'x': 'Others', 'y': 88}
                            ]
                        },
                        {
                            'name': "Financial Services",
                            'data': [
                                {'x': 'USA', 'y': 12},
                                {'x': 'Canada', 'y': 34},
                                {'x': 'China', 'y': 67},
                                {'x': 'Great Britain', 'y': 56},
                                {'x': 'India', 'y': 12},
                                {'x': 'Others', 'y': 84}
                            ],
                        },
                        {
                            'name': "Lending and Investments",
                            'data': [
                                {'x': 'USA', 'y': 12},
                                {'x': 'Canada', 'y': 72},
                                {'x': 'China', 'y': 52},
                                {'x': 'Great Britain', 'y': 21},
                                {'x': 'India', 'y': 27},
                                {'x': 'Others', 'y': 3}
                            ],
                        },
                        {
                            'name': "Payments",
                            'data': [
                                {'x': 'USA', 'y': 67},
                                {'x': 'Canada', 'y': 112},
                                {'x': 'China', 'y': 43},
                                {'x': 'Great Britain', 'y': 38},
                                {'x': 'India', 'y': 32},
                                {'x': 'Others', 'y': 22}
                            ],
                        },
                        {
                            'name': "Platforms",
                            'data': [
                                {'x': 'USA', 'y': 98},
                                {'x': 'Canada', 'y': 35},
                                {'x': 'China', 'y': 87},
                                {'x': 'Great Britain', 'y': 34},
                                {'x': 'India', 'y': 11},
                                {'x': 'Others', 'y': 0}
                            ],
                        },
                        {
                            'name': "Privacy and Security",
                            'data': [
                                {'x': 'USA', 'y': 66},
                                {'x': 'Canada', 'y': 11},
                                {'x': 'China', 'y': 42},
                                {'x': 'Great Britain', 'y': 45},
                                {'x': 'India', 'y': 89},
                                {'x': 'Others', 'y': 1}
                            ],
                        }
                    ],
                ]
            }
            }
