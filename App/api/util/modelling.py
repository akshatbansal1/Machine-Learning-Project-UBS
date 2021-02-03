import lightgbm as lgb
import pandas as pd

def select_model(feats):
    model_id = 0
    model_folder_path = './models/'
    models = [
        'clf_pre.txt',
        'clf_A.txt',
        'clf_B.txt',
        'clf_C.txt'
    ]
    fundings = [
        'PreSeries_post_money_valuation_usd_augmented',
        'RoundA_post_money_valuation_usd_augmented',
        'RoundB_post_money_valuation_usd_augmented',
        'RoundC_post_money_valuation_usd_augmented',
    ]
    for i, round in enumerate(fundings):
        if feats[round] and float(feats[round]) > 0:
            model_id = i
    return model_id, lgb.Booster(model_file=model_folder_path+models[model_id])

def preprocess_data(feats, model_id):
    float64_feats = [
        'percentage_of_male_founder',
        'percentage_of_female_founder',
        'num_completed_degrees_from_top_500_schools',
        'num_incomplete_degrees_from_top_500_schools',
        'PreSeries_num_top_500_investors',
        'RoundA_num_top_500_investors',
        'RoundB_num_top_500_investors',
        'RoundC_num_top_500_investors',
        'PreSeries_investor_count',
        'RoundA_investor_count',
        'RoundB_investor_count',
        'RoundC_investor_count',
        'PreSeries_post_money_valuation_usd_augmented',
        'RoundA_post_money_valuation_usd_augmented',
        'RoundB_post_money_valuation_usd_augmented',
        'RoundC_post_money_valuation_usd_augmented',
        'PreSeries_num_ea_org',
        'RoundA_num_ea_org',
        'RoundB_num_ea_org',
        'RoundC_num_ea_org'
    ]
    int64_feats = [
        'num_FAANG_exp_founder',
        'PreSeries_from_founded_binned',
        'RoundA_from_founded_binned',
        'RoundB_from_founded_binned',
        'RoundC_from_founded_binned',
        'is_category_Artificial Intelligence',
        'is_category_Data and Analytics',
        'is_category_Financial Services',
        'is_category_Lending and Investments',
        'is_category_Payments',
        'is_category_Platforms',
        'is_category_Privacy and Security'
    ]
    bool_feats = [
        'has_domain'
    ]
    category_feats = [
        'country_code',
        'state_code'
    ]
    x_feats_all = [
        'country_code',
        'state_code',
        'has_domain',
        'percentage_of_male_founder',
        'percentage_of_female_founder',
        
        'num_completed_degrees_from_top_500_schools',
        'num_incomplete_degrees_from_top_500_schools',

        'PreSeries_num_top_500_investors',
        'RoundA_num_top_500_investors',
        'RoundB_num_top_500_investors',
        'RoundC_num_top_500_investors',

        'num_FAANG_exp_founder',
        
        'PreSeries_from_founded_binned',
        'RoundA_from_founded_binned',
        'RoundB_from_founded_binned',
        'RoundC_from_founded_binned',
        
        'PreSeries_investor_count',
        'RoundA_investor_count',
        'RoundB_investor_count',
        'RoundC_investor_count',
        
        'PreSeries_post_money_valuation_usd_augmented',
        'RoundA_post_money_valuation_usd_augmented',
        'RoundB_post_money_valuation_usd_augmented',
        'RoundC_post_money_valuation_usd_augmented',
        
        'PreSeries_num_ea_org',
        'RoundA_num_ea_org',
        'RoundB_num_ea_org',
        'RoundC_num_ea_org',
        
        'is_category_Artificial Intelligence',
        'is_category_Data and Analytics',
        'is_category_Financial Services',
        'is_category_Lending and Investments',
        'is_category_Payments',
        'is_category_Platforms',
        'is_category_Privacy and Security'
    ]
    x_feat_A = [
        'RoundA_num_top_500_investors',
        'RoundA_from_founded_binned',
        'RoundA_investor_count',
        'RoundA_post_money_valuation_usd_augmented',
        'RoundA_num_ea_org'
    ]
    x_feat_B = [
        'RoundB_num_top_500_investors',
        'RoundB_from_founded_binned',
        'RoundB_investor_count',
        'RoundB_post_money_valuation_usd_augmented',
        'RoundB_num_ea_org'
    ]
    x_feat_C = [
        'RoundC_num_top_500_investors',
        'RoundC_from_founded_binned',
        'RoundC_investor_count',
        'RoundC_post_money_valuation_usd_augmented',
        'RoundC_num_ea_org'
    ]

    X = pd.DataFrame(feats, index=[0])
    X[category_feats] = X[category_feats].astype("category")
    X[bool_feats] = X[bool_feats].astype('bool')
    X[float64_feats] = X[float64_feats].astype('float64')
    X[int64_feats] = X[int64_feats].astype('int64')
    X = X[x_feats_all]
    if model_id < 3:
        X = X.drop(x_feat_C, axis=1)
        print('drop c')
    if model_id < 2:
        X = X.drop(x_feat_B, axis=1)
        print('drop b')
    if model_id < 1:
        X = X.drop(x_feat_A, axis=1)
        print('drop a')
    return X
