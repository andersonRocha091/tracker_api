create database IF NOT EXISTS fleetwise_prd;
use fleetwise_prd;

CREATE TABLE IF NOT EXISTS `tracking_202007_new` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tracker_uid` smallint(5) unsigned NOT NULL,
  `angle` smallint(3) NOT NULL DEFAULT '0',
  `speed` smallint(3) unsigned NOT NULL DEFAULT '0',
  `aquisition_time` int(10) unsigned NOT NULL DEFAULT '0',
  `visible_satellites` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `engine` enum('on','off') CHARACTER SET utf8 NOT NULL DEFAULT 'on',
  `event_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `event_info` smallint(5) unsigned NOT NULL DEFAULT '0',
  `insert_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `mileage` double(9,3) NOT NULL DEFAULT '0.000',
  `voltage` double(3,1) DEFAULT '0.0',
  `driver_ibutton` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `hdop` double(6,3) DEFAULT '0.000',
  PRIMARY KEY (uid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;