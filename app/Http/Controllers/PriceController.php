<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use GuzzleHttp\Client;

class PriceController extends Controller
{
    private const NOVUS_API = 'https://stores-api.zakaz.ua/stores/48201070/products/search/?q=%D0%B3%D1%80%D0%B5%D1%87%D0%B0%D0%BD%D0%B0%20%D0%BA%D1%80%D1%83%D0%BF%D0%B0';
    private const ECO_API = 'https://stores-api.zakaz.ua/stores/48280214/products/search/?q=%D0%BA%D1%80%D1%83%D0%BF%D0%B0%20%D0%B3%D1%80%D0%B5%D1%87%D0%B0%D0%BD%D0%B0';
    private const METRO_API = 'https://stores-api.zakaz.ua/stores/48215611/products/search/?q=%D0%BA%D1%80%D1%83%D0%BF%D0%B0%20%D0%B3%D1%80%D0%B5%D1%87%D0%B0%D0%BD%D0%B0';
    
    public const STORES_DATA = [
        'Novus'=> self::NOVUS_API,
        'Eco'=> self::ECO_API,
        'Metro'=> self::METRO_API,
    ];

    public function index()
    {
       $data = SORT_ASC($this->_getPrice());
        
        return view('price')->with([
            'data' => $data,
        ]);
    }

    private function _getPrice()
    {
        $price=[];

        foreach(self::STORES_DATA AS $name => $store){
        $client = new Client();
        $request = $client->get($store, ['http_errors' => false,
                'connection_timeout' => 5
            ]);
        $data = json_decode($request->getBody()->getContents());

        $price[$name] = number_format($data['price'], 2, '.', '');
        }
        return $price;
    }
}
