<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pagseguro extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->database();
        $this->load->helper(array('url'));
        $this->load->helper('form');
        $this->load->library('session');
	}
	public function index()
	{
		$this->load->helper('payment');
        $gateway = gateway('pagseguro');
        $post = $this->input->post();

        if(!empty($post['email'])){
            $email = $post['email'];
        }else{
            $email = 'contato@sellpublicidade.com.br';
        }

        if($gateway['production'] == true)
        {
            $url = $gateway['url_production'].'/sessions?email='.$email.'&token='.$gateway['token_production'];
        }else{
            
            $url = $gateway['url_sandbox'].'/sessions?email='.$email.'&token='.$gateway['token_sandbox'];
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_HTTPHEADER ,array("Content-Type: application/x-www-form-urlencoded; charset=UTF-8"));
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            $return = curl_exec($curl);
            curl_close($curl);
            if($return != 'Unauthorized')
            {
            $xml = simplexml_load_string($return);
            echo json_encode($xml);
            }else{
                echo $return;
            }

        }
    
    }
    
    public function buy()
    {
        
        $post = $this->input->post();
        echo json_encode($post);

    }
}
