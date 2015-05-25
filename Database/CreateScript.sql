CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `description` text NOT NULL,
  `origins`  text NOT NULL,
  `benefits`  text NOT NULL,
  `meant_for`  text NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE `room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `location` text NOT NULL,
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `room_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE `course` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `description` text NOT NULL,
  `target`  text NOT NULL,
  `schedule`  text NOT NULL,
  `level`  varchar(40) NOT NULL,
  `course_category_id`  int NOT NULL,
  `course_room_id`  int NOT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `course_title` (`title`),
  CONSTRAINT `course_category_id` FOREIGN KEY (`course_category_id`) REFERENCES `category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `course_room_id` FOREIGN KEY (`course_room_id`) REFERENCES `room` (`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE `room_gallery` (
  `room_gallery_id` int NOT NULL AUTO_INCREMENT,
  `fk_room_id` int NOT NULL,
  `image_path` text NOT NULL,
  PRIMARY KEY (`room_gallery_id`),
  CONSTRAINT `fk_room_id` FOREIGN KEY (`fk_room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `instructor` (
  `instructor_id` int(11) NOT NULL AUTO_INCREMENT,
  `bio` text NOT NULL,
  `qualifications` text NOT NULL,
  `prizes_and_awards` text NOT NULL,
  `instructor_of_the_month` int(1) NOT NULL,
  PRIMARY KEY (`instructor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `course_instructor` (
  `course_instructor_id` int NOT NULL AUTO_INCREMENT,
  `fk_course_id` int NOT NULL,
  `fk_instructor_id` int NOT NULL,
  PRIMARY KEY (`course_instructor_id`),
  CONSTRAINT `fk_course_id` FOREIGN KEY (`fk_course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_instructor_id` FOREIGN KEY (`fk_instructor_id`) REFERENCES `instructor` (`instructor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `category_instructor` (
  `category_instructor_id` int NOT NULL AUTO_INCREMENT,
  `fk_category_id` int NOT NULL,
  `fk_cat_instructor_id` int NOT NULL,
  PRIMARY KEY (`category_instructor_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`fk_category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cat_instructor_id` FOREIGN KEY (`fk_cat_instructor_id`) REFERENCES `instructor` (`instructor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `equipment` (
  `equipment_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
   `description` text NOT NULL,
   `image_path` text NOT NULL,
  PRIMARY KEY (`equipment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `testimonial` (
  `testimonial_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) ,
   `description` text NOT NULL,
   `link` text NOT NULL,
  PRIMARY KEY (`testimonial_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `address` text NOT NULL,
   `how_to_get_here` text NOT NULL,
   `lat` float NOT NULL,
   `long` float NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `membership` (
  `membership_id` int NOT NULL AUTO_INCREMENT,
  `option` text NOT NULL,
  PRIMARY KEY (`membership_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `schedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `day` varchar(30) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL, 
  `repeat` varchar(60) NOT NULL,
  `schedule_course_id` int NOT NULL,
  PRIMARY KEY (`schedule_id`),
  CONSTRAINT `schedule_course_id` FOREIGN KEY (`schedule_course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
