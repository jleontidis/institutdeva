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

class WWW_controller_courses extends WWW_Factory {
	
	//This function adds a course in database
	// * title - Title of the course
	// * description - Description of the course
	// * date - Date of the course
	public function add($input){
	    if(!isset($input['title']) || $input['title']==''){
	        $this->returnData['error']='Title is missing';
	    }else if(!isset($input['description']) || $input['description']==''){
	    	$this->returnData['error'] = 'Description is missing';
	    } 
	    else {
	        // This loads the model object from the class we created
	        $course=$this->getModel('course');
	        $course->setTitle($input['title']);
	        $course->setDescription($input['description']);
	        $course->setDate($input['date']);
	        $course->setCreated($input['created']);
	        if($course->saveCourse()){
	            $this->returnData['success']='Course saved!';
	        } else {
	            $this->returnData['error']='Could not save course!';
	        }
	    }
	    return $this->returnData;
	}
	
	
	// This returns data about a course based on ID
	// * id - ID of the course to return information for
	public function get($input){
	    if(!isset($input['id']) || $input['id']=='' || $input['id']==0){
	        $this->returnData['error']='ID is incorrect!';
	    } else {
	        $course=$this->getModel('course');
	        $course=$course->loadCourse($input['id']);
	        if($course){
	            $this->returnData=$course;
	        } else {
	            $this->returnData['error']='Cannot find course with this ID!';
	        }
	    }
	    return $this->returnData;
	}
	
	
	// This loads all listed courses from database
	public function all(){
	    $courses=$this->getModel('course');
	    $courses=$courses->loadAllCourses();
	    if($courses){
	        $this->returnData=$courses;
	    } else {
	        $this->returnData['error']='Cannot find courses!';
	    }
	    return $this->returnData;
	}
	
	// This updates a course from database
	// * id - ID of the course to delete
	public function update($input)
	{
	    if(!isset($input['id']) || $input['id']=='' || $input['id']==0){
	        $this->returnData['error']='ID is incorrect!';
	    } else {
	        $course=$this->getModel('course');
	        $course->setTitle($input['title']);
	        $course->setDescription($input['description']);
	        $course->setDate($input['date']);
	        $course->setCreated($input['created']);
	        $course=$course->updateCourse($input['id']);
	        if($course){
	            $this->returnData['success']='Course updated!';
	        } else {
	            $this->returnData['error']='Cannot find course with this ID!';
	        }
	    }
	    return $this->returnData;
	}
	
    // This deletes a course from database
	// * id - ID of the course to delete
	public function delete($input){
		if(!isset($input['id']) || $input['id']=='' || $input['id']==0){
			$this->returnData['error']='ID is incorrect!';
		} else {
			$course=$this->getModel('course');
			$course=$course->deleteCourse($input['id']);
			if($course){
				$this->returnData['success']='Course deleted!';
			} else {
				$this->returnData['error']='Cannot find course with this ID!';
			}
		}
		return $this->returnData;
	}
	
	
}
	
?>