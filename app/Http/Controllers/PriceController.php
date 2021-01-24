<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use GuzzleHttp\Client;

class PriceController extends Controller {

    private const NOVUS_API = 'https://stores-api.zakaz.ua/stores/48201070/products/search/?q=%D0%B3%D1%80%D0%B5%D1%87%D0%B0%D0%BD%D0%B0%20%D0%BA%D1%80%D1%83%D0%BF%D0%B0';
    private const ECO_API = 'https://stores-api.zakaz.ua/stores/48280214/products/search/?q=%D0%BA%D1%80%D1%83%D0%BF%D0%B0%20%D0%B3%D1%80%D0%B5%D1%87%D0%B0%D0%BD%D0%B0';
    private const METRO_API = 'https://stores-api.zakaz.ua/stores/48215611/products/search/?q=%D0%BA%D1%80%D1%83%D0%BF%D0%B0%20%D0%B3%D1%80%D0%B5%D1%87%D0%B0%D0%BD%D0%B0';
    private const STORES_DATA = [
        'Novus' => self::NOVUS_API,
        'Eco' => self::ECO_API,
        'Metro' => self::METRO_API,
    ];

    public function index() {
        $data = $this->_getSortPrice();

        return view('index')->with([
                    'data' => $data,
        ]);
    }

    private function _getSortPrice() {
        $data = [];

        foreach (self::STORES_DATA AS $name => $api) {
            $client = new Client();

            $request = $client->get($api, ['http_errors' => false,
                'connection_timeout' => 10
            ]);

            $response = json_decode($request->getBody()->getContents(), true);

            for ($i = 0; $i < count($response['results']); ++$i) {
                $data[] = [
                    'shop' => $name,
                    'ean' => $response['results'][$i]['ean'],
                    'title' => $response['results'][$i]['title'],
                    'price' => $response['results'][$i]['price'],
                ];
            }
        }
        $volume = array_column($data, 'price');
        array_multisort($volume, SORT_ASC, $data);

        return $data;
    }

}
