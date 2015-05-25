CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `description` tinytext NOT NULL,
  `origins`  tinytext NOT NULL,
  `benefits`  tinytext NOT NULL,
  `meant_for`  tinytext NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE `room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `location` tinytext NOT NULL,
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `room_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE `course` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `description` tinytext NOT NULL,
  `target`  tinytext NOT NULL,
  `schedule`  tinytext NOT NULL,
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
  `image_path` tinytext NOT NULL,
  PRIMARY KEY (`room_gallery_id`),
  CONSTRAINT `fk_room_id` FOREIGN KEY (`fk_room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `instructor` (
  `instructor_id` int(11) NOT NULL AUTO_INCREMENT,
  `bio` tinytext NOT NULL,
  `qualifications` tinytext NOT NULL,
  `prizes_and_awards` tinytext NOT NULL,
  `instructor_of_the_month` tinyint(1) NOT NULL,
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
   `description` tinytext NOT NULL,
   `image_path` tinytext NOT NULL,
  PRIMARY KEY (`equipment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `testimonial` (
  `testimonial_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) ,
   `description` tinytext NOT NULL,
   `link` tinytext NOT NULL,
  PRIMARY KEY (`testimonial_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;