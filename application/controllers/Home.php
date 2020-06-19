<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->database();
	}
	public function index()
	{
		$this->load->helper('payment');
		$gateway = gateway('pagseguro');

		if($gateway['payment'] == 'pagseguro')
		{
			if($gateway['production'] == true)
			{
				echo 'em produção!';
			}else{
				echo 'em sandbox';
			}
		}

		$this->load->view('home');
	}
}
