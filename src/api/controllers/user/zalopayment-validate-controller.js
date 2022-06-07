
// Node v10.15.3
const CryptoJS = require('crypto-js'); // npm install crypto-js
const express = require('express'); // npm install express
const bodyParser = require('body-parser'); // npm install body-parser
const app = express();

class zaloValidator {
    validate(req, res, next) {
        let result = {};
        try {
            let dataStr = req.body.data;
            let reqMac = req.body.mac;

            let mac = CryptoJS.HmacSHA256(dataStr, 'eG4r0GcoNtRGbO8').toString();
            console.log("mac =", mac);

            // check if the callback is valid (from ZaloPay server)
            if (reqMac !== mac) {
                // callback is invalid
                result.return_code = -1;
                result.return_message = "mac not equal";
            }
            else {
                // payment success
                // merchant update status for order's status
                let dataJson = JSON.parse(dataStr, 'eG4r0GcoNtRGbO8');
                console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

                result.return_code = 1;
                result.return_message = "success";
            }
        } catch (ex) {
            result.return_code = 0; // callback again (up to 3 times)
            result.return_message = ex.message;
        }
        // returns the result for ZaloPay server
        res.json(result);
    }



}