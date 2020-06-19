<?php
defined('BASEPATH') OR exit('No direct script access allowed');
if (!function_exists('demo')) 
{
    function credentials($gateway)
    {
        $ci=& get_instance();
        $ci->load->database(); 
        $ci->load->config('payment');
        $json = $ci->config->item($gateway);
        return $json;
    }

    // Get credentials of payment gateway
    function gateway($gateway){

        $credentials = credentials($gateway);
        if($credentials)
        {
            return $credentials;
        }else{
            exit('Este Gateway de pagamento não existe!');
        }
        

    }
}