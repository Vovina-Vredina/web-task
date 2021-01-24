<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;
use GuzzleHttp\Client;


class PriceController extends Controller

{
    private const NOVUS_API = 'https://stores-api.zakaz.ua/stores/48201070/products/search/?q=%D0%B3%D1%80%D0%B5%D1%87%D0%B0%D0%BD%D0%B0%20%D0%BA%D1%80%D1%83%D0%BF%D0%B0';
    private const ECO_API = 'https://stores-api.zakaz.ua/stores/48280214/products/search/?q=%D0%BA%D1%80%D1%83%D0%BF%D0%B0%20%D0%B3%D1%80%D0%B5%D1%87%D0%B0%D0%BD%D0%B0';
    private const METRO_API = 'https://stores-api.zakaz.ua/stores/48215611/products/search/?q=%D0%BA%D1%80%D1%83%D0%BF%D0%B0%20%D0%B3%D1%80%D0%B5%D1%87%D0%B0%D0%BD%D0%B0';
    
    public const SHOP_DATA = [
        self::NOVUS_API,
        self::ECO_API,
        self::METRO_API,
    ];

    public function index()
    {
        $client = new Client();

        $response = $client->post(self::NOVUS_API, ['http_errors' => false,
                'connection_timeout' => 5
            ]
        );

        $statusCode = $response->getStatusCode();
        $contents = $response->getBody()->getContents();
        
        return view('compare_price', [
            'statusCode' => $statusCode,
            'contents' => $contents,
        ]);
        
    }

}
