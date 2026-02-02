import * as BaseRequest from './base.request';
import Logger from "../../helpers/logger.helper"
import {StatusCode as StatusCode} from '../materials/statusCodes.material';
import {products as Product} from '../materials/urlMapper.material';
import {buildGetProductByCategoryBody} from "../payloads/product.payload";

export async function getProducts(criteria: any) {
    const response = await BaseRequest.sendPOSTRequest(process.env.BASE_API_URL, Product.byCat, buildGetProductByCategoryBody(criteria.code))
    response.status !== StatusCode.OK &&
    Logger.error(`Getting product summaries failed with details: ${JSON.stringify(response)}`);

    return response;
}