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

class WWW_model_course extends WWW_Factory {

	/**
	 * It is recommended to define all data variables here. Usually the 
	 * data variables have the same names as the column names of database 
	 * rows from a table.
	 */
	public $id = 0;
	public $title = '';
	public $description = '';
	public $date = '';
	public $created = '';
	
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
	
		// Do something here
		return true;
		
	}
	
	public function setTitle($title)
	{
		$this->title = $title;
	}
	
	public function setDescription($description)
	{
	    $this->description = $description;
	}
	
	public function setDate($date)
	{
		$this->date = $date;
	}
	
	public function setCreated($created)
	{
	    $this->created = $created;
	}
	
	public function saveCourse(){
	    // Making sure that title and year are both set
	    if($this->title!='' && $this->description && $this->created !=''){
	        // Database location
	        $dbLoc=$this->getState('directory-data').'courses.db';
	        // If database file already exists, we simply load the database and unserialize its data to add a new course to it
	        if(file_exists($dbLoc)){
	            $curDb=unserialize(file_get_contents($dbLoc));
	            // ID's are indexes in the stored array, so we seek the highest index in that array
	            $nextId=max(array_keys($curDb))+1;
	        } else {
	            // Since database did not exist, an array is created for new database
	            $curDb=array();
	            $nextId=1;
	        }
	        // Creating data node of current movie
	        $course=array();
	        $course['title']=$this->title;
	        $course['description']=$this->description;
	        $course['date']=$this->date;
	        $course['created']=$this->created;
	     
	        // Adding the new node into database array
	        $curDb[$nextId]=$course;
	        // We overwrite the old database with the updated database with a new course
	        if(file_put_contents($dbLoc,serialize($curDb))){
	            return $nextId;
	        } else {
	            return false;
	        }
	    } else {
	        return false;
	    }
	}
	
	public function loadCourse($id=0){
	    if($id!=0){
	        // Database location
	        $dbLoc=$this->getState('directory-data').'courses.db';
	        // Making sure that current database exists
	        if(file_exists($dbLoc)){
	            $curDb=unserialize(file_get_contents($dbLoc));
	        } else {
	            return false;
	        }
	        // If this course exists in the database, we assign its values to
	        // current object.
	        if(isset($curDb[$id])){
	            $this->id=$id;
	            $this->title=$curDb[$id]['title'];
	            $this->description=$curDb[$id]['description'];
	            $this->date=$curDb[$id]['date'];
	            $this->created=$curDb[$id]['created'];
	            return array(
	                'id'=>$id,
	                'title'=>$curDb[$id]['title'],
	                'description'=>$curDb[$id]['description'],
	                'date'=>$curDb[$id]['date'],
	                'created'=>$curDb[$id]['created']
	              );
	        } else {
	            return false;
	        }
	    } else {
	        return false;
	    }
	}
	
	public function loadAllCourses(){
	    // Database location
	    $dbLoc=$this->getState('directory-data').'courses.db';
	    // Making sure that current database exists
	    if(file_exists($dbLoc)){
	        $curDb=unserialize(file_get_contents($dbLoc));
	    } else {
	        // Since database does not exist (and thus movies don't exist) we return empty array instead of false
	        return array();
	    }
	    // We store all course data in a separate array that will be returned
	    $allMovies=array();
	    foreach($curDb as $id=>$data){
	        $course=array();
	        $course['id']=$id;
	        $course['title']=$data['title'];
	        $course['description']=$data['description'];
	        $course['date']=$data['date'];
	        $course['created']=$data['created'];
	        $allCourses[]=$course;
	    }
	    return $allCourses;
	}
	
	public function updateCourse($id=0)
	{
	  // This function, if defined with an ID, updates specific ID, otherwise it updates currently active ID
	    if($id!=0){
	        $updateId=$id;
	    } else if($this->id!=0){
	        $updateId=$this->id;
	    } else {
	        // No ID was set in here nor in the current object
	        return false;
	    }
	    // Database location
	    $dbLoc=$this->getState('directory-data').'courses.db';
	    // If database does not exist then we have no courses to update
	    if(file_exists($dbLoc)){
	        $curDb=unserialize(file_get_contents($dbLoc));
	    } else {
	        return false;
	    }
	    // If such an ID exists in database, it is simply update
	    if(isset($curDb[$updateId]))
	    {
	        $course=array();
	        $course['title']=$this->title;
	        $course['description']=$this->description;
	        $course['date']=$this->date;
	        $course['created']=$this->created;
	        // Adding the new node into database array
	        $curDb[$updateId]=$course;
	       
	    } else {
	        return false;
	    }
	    // We overwrite the old database with the updated database
	    if(file_put_contents($dbLoc,serialize($curDb))){
	        return true;
	    } else {
	        return false;
	    }
	}
	
	public function deleteCourse($id=0){
	    // This function, if defined with an ID, deletes specific ID, otherwise it deletes currently active ID
	    if($id!=0){
	        $deleteId=$id;
	    } else if($this->id!=0){
	        $deleteId=$this->id;
	    } else {
	        // No ID was set in here nor in the current object
	        return false;
	    }
	    // Database location
	    $dbLoc=$this->getState('directory-data').'courses.db';
	    // If database does not exist then we have no courses to delete
	    if(file_exists($dbLoc)){
	        $curDb=unserialize(file_get_contents($dbLoc));
	    } else {
	        return false;
	    }
	    // If such an ID exists in database, it is simply unset
	    if(isset($curDb[$deleteId])){
	        unset($curDb[$deleteId]);
	    } else {
	        return false;
	    }
	    // We overwrite the old database with the updated database
	    if(file_put_contents($dbLoc,serialize($curDb))){
	        return true;
	    } else {
	        return false;
	    }
	}

}
	
?>