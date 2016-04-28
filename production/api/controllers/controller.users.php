<?php
/**
 * Institut Deva <http://www.institutdeva.ch>
 * Controller Class
 *
 * It is recommended to extend Controller classes from WWW_Factory in order to 
 * provide various useful functions and API access for the Controller.
 *
 * @package    Factory
 * @author     Jerome Leontidis <jleontidis@gmail.com>
 * @copyright  Copyright (c) 2013, Jerome Leontidis
 * @license    Unrestricted
 * @tutorial   /doc/pages/guide_mvc.htm
 * @since      1.0.0
 * @version    1.0.0
 */
include(realpath('../').DIRECTORY_SEPARATOR."FirePHPCore/fb.php");
class WWW_controller_users extends WWW_Factory {
	
        public function checklogin($userData)
        {
            $this->unsetUser();
            
        	if(!isset($userData['username']) || $userData['username']=='')
        	{
	           $this->returnData['error']='Username is missing.';
	        }
	        else if(!isset($userData['password']) || $userData['password']=='')
	        {
	    	  $this->returnData['error'] = 'Password is missing.';
	        } 
	        else 
	        {
    	        // This loads the model object from the class we created
    	        $user = $this->getModel('user');
    	        
    	     
    	        if($user->username === $userData['username'])
    	        {
    	            if($user->password == $userData['password'])
    	            {
    	                $this->setUser($userData);
    	                $this->returnData['success']='User logged in!';
    	            }
    	            else 
    	            {
    	                $this->returnData['error']='Password not correct!';
    	            }
    	            
    	        }
    	        else 
    	        {
    	            $this->returnData['error']='Could not log in!';
    	        }
	       }
	       return $this->returnData;
        }
        
	public function logout() 
	{
	   $this->unsetUser();
  	}
  	
  	public function get()
  	{  
  	      $this->returnData['success'] = $this->getUser('username');
  	      
  	    return $this->returnData;
  	}
  	
  	
  	public function sendEmail($emailData)
  	{
  	    //paramètre d'envoie le message
  	    $contactAdress="info@institutdeva.ch";
  	    $contactMailTitle=" Message | www.institutdeva.ch ";
  	    
  	    $nameOfMail = $emailData['name'];
  	    $adressOfMail = $emailData['email'];
  	    $messageOfMail = stripslashes(htmlentities(utf8_decode($emailData['message'])));
  	    
  	     
  	    $headers  = 'MIME-Version: 1.0' . "\n";
  	    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\n";
  	    $headers .= 'From: '.$nameOfMail.'<'.$adressOfMail.'>'." \r\n";
  	    
  	    $adressToMail=$contactAdress;
  	    
  	    if(mail($adressToMail, $contactMailTitle, nl2br($messageOfMail), $headers))
  	    {
  	        $this->returnData['email'] = "Email sent succesfully";
  	    }
  	    else
  	    {
  	       $this->returnData['email'] = "Email was not send succesfully";
  	    }
  	    
  	    return $this->returnData;
  	}
	
}
	
?>