<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class PriceController extends Controller {

    private const STORES_API = 'https://stores-api.zakaz.ua/stores/';
    private const NOVUS_ID = '48201070';
    private const ECO_ID = '48280214';
    private const METRO_ID = '48215611';

    public function search(Request $request) {
        $data = [];

        $selectedNovus = $request->input('selected-novus');
        $selectedEco = $request->input('selected-eco');
        $selectedMetro = $request->input('selected-metro');

        $search = $request->input('search');

        $stores = [
            'Novus' => [
                'id' => self::NOVUS_ID,
                'checked' => $this->_isChecked($selectedNovus, 'novus')],
            'Eco' => [
                'id' => self::ECO_ID,
                'checked' => $this->_isChecked($selectedEco, 'eco')],
            'Metro' => [
                'id' => self::METRO_ID,
                'checked' => $this->_isChecked($selectedMetro, 'metro')],
        ];

        if ($search !== null) {
            $data = $this->_getSortPrice($stores, $search);
        }

        $status = false;

        if (!empty($data)) {
            $status = true;
        }
        return response()->json([
                    'success' => $status,
                    'data' => $data,
        ]);
    }

    private function _getSortPrice($stores, $search) {
        $data = [];

        $client = new Client();
        foreach ($stores AS $name => $store) {
            if ($store['checked'] == false) {
                continue;
            }

            $api = self::STORES_API . $store['id'] . '/products/search/?q=' . $search;
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
        $price = array_column($data, 'price');
        array_multisort($price, SORT_ASC, $data);

        return $data;
    }

    private function _isChecked($selectedStore, $value) {
        if (!empty($selectedStore)) {
            if ($selectedStore == $value) {
                return true;
            }
        }
        return false;
    }

}
