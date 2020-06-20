<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->database();
		$this->load->helper(array('url'));
	}
	public function index()
	{
		$this->load->helper('payment');
		$gateway = gateway('pagseguro');

		if($gateway['production'] == 'true')
		{
			$status = 'production';
		}else{
			$status = 'sandbox';
		}

		$pagedata = array(
			'gateway' => $gateway,
			'view' => $gateway['payment'].'-'.$status.'_gateway'
		);

		if($gateway['payment'] == 'pagseguro')
		{
			if($status == 'production')
			{
				$this->load->view($pagedata['view'], $pagedata);
			}else{
				$this->load->view($pagedata['view'],$pagedata);
			}
		}

		$this->load->view('home');
	}
}
