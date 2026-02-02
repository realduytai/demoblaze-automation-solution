export const headers = {
    APPLICATION_JSON: {"Content-Type": "application/json"},
    ACCEPT_JSON: {"Accept": "application/json"},
    REFERER: {"referer": `${process.env.BASE_URL}`},
    URLENCODING: {"content-type": "application/x-www-form-urlencoded"},
};

export const basicHeader = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};
