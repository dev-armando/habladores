<?php

    /**
     * @Product endpoints
     * @author Armando Rojas <armando.develop@gmail.com>
     * @github: https://github.com/dev-armando
     */

    Class Database{

        private $_connection;
        public function __construct(){
           extract( require('config.php') );
           try{
                $this->_connection = new PDO('mysql:host='.$host.'; dbname='.$db, $user, $pass);
                $this->_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->_connection->exec("SET CHARACTER SET utf8");
           }catch (\PDOException $e){
                print "Error!: " . $e->getMessage();
                die();
            }
        }

        public function prepare($sql){
            return $this->_connection->prepare($sql);
        }

        public function set_array($data=array()){

            $prepareArray =  [];

            foreach($data as $key=>$value) $prepareArray[':'.$key]=$value;

            return $prepareArray;
	    }

        public function execute($sql , $datos = array()){
            try {

                $query = $this->prepare($sql);
                $query->execute($this->set_array($datos) );
                if( $sql[0] == 'S' ||  $sql[0] == 's')
                    return ($query->fetchAll(PDO::FETCH_ASSOC));
                else
                    return true;
            }
            catch(PDOException $e){

                return -1;
            }
        }

    }


    return new Database();
?>