module.exports = {
  DEFAULT_ERROR_CODE: 5,
  START_CODE: 100000,
  END_CODE: 999999,
  POINT: {
    JOIN_LESSON: 5,
    QUIT_LESSON: -10,
  },
  SUB_REGISTER: "__register_",
  DESC: -1, // giam dan
  ASC: 1, // tang dan
  CHOOSE: 1,
  TYPE_ASC: "ASC",
  TYPE_DESC: "DESC",
  GET_METHOD: "get",
  POST_METHOD: "post",
  JOIN_DURATION_TIME: 900,
  REJECT_DURATION_TIME: -3600,
  SORT_TYPE_POINT_DASHBOARD: "totalPoint",
  DBO_REGISTER: 0,
  SIZE_UPLOAD: 2 * 1024 * 1024,
  FOLDER_COURSE_AVATAR: "course_avatar",
  URL_S3: `https://${_config.S3.BUCKET_NAME}.s3.${_config.S3.REGION}.amazonaws.com/`,
  PAGE_SIZE: 10, // so luong doc trong 1 page
  PAGE_SKIP: 0, // so luong doc bo qua
  SORT_CREATE: "created",
  DBO_REGISTER_COURSE: 1,
  SUB_REGISTER_COURSE: "__register_course",
  MY_LOGO_S3: "https://appdu-storage.s3-ap-southeast-1.amazonaws.com/logo.png",
  MAIL_TO_DEFAULT: "dulh181199@gmail.com",
  MAIL_SUBJECT_DEFAULT: "EMAIL INVALID",
  TEMPLATE_EMAIL: "email_verify_code",
  NAME: "Du Sainbolt",
  SUBJECT_NOTIFY: "Sainbolt App thông báo",
  FORMAT_DATE_UTC: "DD/MM/YYYY",
  FB_GROUP_NOW: "https://www.facebook.com/groups/sainboltclass112020",
  TEMPLATE_COURSE_RQ: "email_request_course",
  TEMPLATE_EMAIL_NOTIFY: "email_notify",
  TEMPLATE_EMAIL_NOTIFY_ACCOUNT: "email_notify_account",
  SUBJECT_REGISTER: "Xác nhận tham gia Sainbolt Group",
  SUBJECT_REQUEST_COURSE: "Kết quả hồ sơ đăng kí Sainbolt Group",
  TIME_OUT_REGISTER: 300, // 5p
  REDIS_EXPIRES: "EX",
  FORMAT_24H_TIME: "HH:mm:ss",
  BOT: {
    PAYLOAD_LIST_PLATFORM: "PAYLOAD_LIST_PLATFORM",
    CONTACT_MAKE_WEB_SITE: "CONTACT_MAKE_WEB_SITE",
    HOW_PROJECT: "HOW_PROJECT",
    START_APP: "START_APP",
    CONTACT_MAKE_APP_MOBILE: "CONTACT_MAKE_APP_MOBILE",
    MORE_USER_APP: "MORE_USER_APP",
  },
  UNICODE: {
    a: ["áàảãạăắằẳẵặâấầẩẫậåäæāąǻǎ"],
    A: ["ÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÅÄÆĀĄǺǍ"],
    ae: ["ǽ"],
    AE: ["Ǽ"],
    c: ["ćçĉċč"],
    C: ["ĆĈĈĊČ"],
    d: ["đď"],
    D: ["ĐĎ"],
    e: ["éèẻẽẹêếềểễệëēĕęė"],
    E: ["ÉÈẺẼẸÊẾỀỂỄỆËĒĔĘĖ"],
    f: ["ƒ"],
    F: [""],
    g: ["ĝğġģ"],
    G: ["ĜĞĠĢ"],
    h: ["ĥħ"],
    H: ["ĤĦ"],
    i: ["íìỉĩịîïīĭǐįı"],
    I: ["ÍÌỈĨỊÎÏĪĬǏĮİ"],
    ij: ["ĳ"],
    IJ: ["Ĳ"],
    j: ["ĵ"],
    J: ["Ĵ"],
    k: ["ķ"],
    K: ["Ķ"],
    l: ["ĺļľŀł"],
    L: ["ĹĻĽĿŁ"],
    o: ["óòỏõọôốồổỗộơớờởỡợöøǿǒōŏő"],
    O: ["ÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÖØǾǑŌŎŐ"],
    Oe: ["œ"],
    OE: ["Œ"],
    n: ["ñńņňŉ"],
    N: ["ÑŃŅŇ"],
    u: ["úùủũụưứừửữựûūŭüůűųǔǖǘǚǜ"],
    U: ["ÚÙỦŨỤƯỨỪỬỮỰÛŪŬÜŮŰŲǓǕǗǙǛ"],
    s: ["ŕŗř"],
    R: ["ŔŖŘ"],
    s: ["ßſśŝşš"],
    S: ["ŚŜŞŠ"],
    t: ["ţťŧ"],
    T: ["ŢŤŦ"],
    w: ["ŵ"],
    W: ["Ŵ"],
    y: ["ýỳỷỹỵÿŷ"],
    Y: ["ÝỲỶỸỴŸŶ"],
    z: ["źżž"],
    Z: ["ŹŻŽ"],
  },
};
