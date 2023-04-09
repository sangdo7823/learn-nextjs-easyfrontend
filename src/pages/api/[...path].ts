// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from "http-proxy";
import Cookies from 'cookies';
// type Data = {
//   name: string
// }
export const config = {
    api: {
        bodyParser: false,
    },
}
const proxy = httpProxy.createProxyServer()
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return new Promise((resolve) => {
        const cookie = new Cookies(req, res);
        if (cookie.get('access_token')) {
            req.headers.authorization = `Bearer ${cookie.get('access_token')}`
        }
        // don't sent cookies to API server
        req.headers.cookie = ''
        //console.log(process.env.API_URL)
        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: false
        })
        proxy.once('proxyRes', () => {
            resolve(true)
        })
    })
    //res.status(200).json({ name: 'Path match all here' })
}
