<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->database->
	}
	public function index()
	{
		$this->load->helper('payment');
		credentials();
		$this->load->view('home');
	}
}
