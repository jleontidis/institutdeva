<?php

/**
 * Institut Deva <http://www.institutdeva.ch>
 * Model Class
 *
 * It is recommended to extend Model classes from WWW_Factory in order to 
 * provide various useful functions and API access for the Model.
 *
 * @package    Factory
 * @author     Jerome Leontidis <jleontidis@gmail.com>
 * @copyright  Copyright (c) 2013, Jerome Leontidis
 * @license    Unrestricted
 * @tutorial   /doc/pages/guide_mvc.htm
 * @since      1.0.0
 * @version    1.0.0
 */

class WWW_model_user extends WWW_Factory {

	/**
	 * It is recommended to define all data variables here. Usually the 
	 * data variables have the same names as the column names of database 
	 * rows from a table.
	 */
	public $id = 0;
	public $username = 'deva';
	public $password = '75hk3L-G54';
	public $lastlogindate = '';
	
	/**
	 * Alternative to __construct()
	 *
	 * WWW_Factory does not allow to overwrite __construct() method, so 
	 * this __initialize() is used instead and loaded automatically when 
	 * object is created.
	 *
	 * @return boolean
	 */
	public function __initialize(){

		return true;
		
	}
	
	public function getUserData()
	{
	    return array(
			'username'=>$this->username,
			'password'=>$this->password
		);
	}

}
	
?>