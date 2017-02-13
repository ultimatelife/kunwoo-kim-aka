# NBP인턴 김건우      /          Project Name : kunwoo-kim-aka H1
=============

## 1. URL
 * /
 * /test
   * step2, step6
 * /products
   * step4, step7
 * /products/graph
   * 3개의 그래프를 출력



## 2. Shell Scripte
 * Shell Script 실행 할 때는 반드시 해당 디렉토리에 가서 실행을 시켜야함

 * ./shell_script/build.sh
   * Git 에서 master branch 를 fetch
   * 빌드스크립트
   * 프로젝트를 build/kunwoo-kim-aka/ 에 빌드 한 후, 실행

 * ./shell_script/test.sh
   * 프로젝트 테스트 실행
     * HTTP status code 200 인지 확인
     * API Test : Client 에게 출력된 데이터가 DB의 데이터와 일치하는지 확인

 * ./shell_script/deploy.sh
   * 'build/kunwoo-kim-aka/' 의 directory에 위치한 프로젝트를 'deploy/kunwoo-kim-aka/' 로 복사(rsync 사용)
   * rsync-ssh 를 사용하여 실제 service 되는 서버(dev-akakun_web1, dev-akakun_web2)에 전송
   * dev-akakun_web1, dev-akakun_web2 에서 업데이트 된 프로젝트로 재실행

 * ./data/data_load.sh
   * ./data/data.csv 파일을 mongodb로 로딩 및 삭제 기능 제공
     * 1 : insert into Dev Database(localhost)
     * 2 : insert into Service Database(localhost)
     * 3 : drop collection of Dev Database
     * 4 : drop collection of Service Database



 ## 3. Need install package
 1. NodeJS v6.9.1
 2. Mongo v3.2.12
 3. NPM v3.10.8
 
## 4. Directory
1. build
    * build.sh 가 실행된 후 저장되는 directory 
2. config
    * app 을 구동 하기위한 설정 파일 
3. data
    * csv 파일과 csv 파일을 MongoDB 에 넣기 위한 shell script
4. deploy
    * deploy 될 파일들
5. models
    * MongoDB 와 mapping 될 객체들이 위치
6. node_modules
    * app 을 실행하기 위한 package 들의 저장소
7. public
    * 정적(static)파일들이 저장된 장소(img/css/javascript)
8. routes
    * url route 가 일어나고 실제 기능이 실행
9. shell_script
    * build.sh
        * 위 참조
    * deploy.sh
        * 위 참조
    * exclude_files_list
        * build 시 제외할 파일들의 list
        * build script 가 실행 될 때 실행됨
    * server_list
        * build 시 제외할 파일들의 list
        * deploy script 가 실행 될 때 실행됨\
    * ssh_shell.sh
        * service server 에 전달할 명령을 저장한 script
        * service server 에 있는 process 를 재시작 시킴
        * deploy script 가 실행 될 때 실행됨
    * test.sh
        * 위 참조
    
10. test
    * test를 하기위한 test case 들이 저장
11. views
    * ejs 파일들이 저장
12. app.js
    * 구동에 필요한 패키지들을 설정 및 초기화 하는 기능
13. app_test.js
    * test 를 할때 사용되는 설정들을 초기화 하는 기능
14. package.json
    * app을 실행 시키는데 필요한 package 들의 list
    * build 시 이 list들을 바탕으로 package install 함
    
## 5. Step
 1. Step1
  * VM
    * name : dev-akaun.ncl
    * package
        * npm v3.10.8
        * NodeJS v6.9.1
        * vim v7.4.160
        * MongoDB v3.2.12
 2. Step2
    * 사용된 파일 : app.js, ./route/test.js
    * URL : 10.110.240.13/test
 3. Step3
    * Data : http://data.seoul.go.kr/openinf/sheetview.jsp?infId=OA-13430
    * 방법 : MongoDB 에서 제공해주는 command line 기능으로 csv파일을 database 로딩하는 shell script 를 만듬
        * 파일 : ./data/data_load.sh
 4. Step4
    * JS Package
        * Jquery v1.12.0
        * DataTables v1.10.13
        * BootStrap v3.3.7
    * 사용된 파일 : app.js, ./routes/products.js, ./views/products.ejs , ./public/bootstrap , ./public/jquery-1.12.0 , ./public/datatable
 5. Step5
    * 각 step 별로 branch 를 나누고 step 이 끝날때마다 master 와 merge 하는 방식을 취함
 6. Step6
    * VM
        * load balancer : dev-akaun_lb / 10.113.228.131
        * Web1 Server  : dev-akaun_web1 / 10.110.240.196
        * Web2 Server  : dev-akaun_web2 / 10.110.240.191
        * DB Server  : dev-akaun_db1 / 10.110.240.205
    * URL 
        * http://10.113.228.131/test
 7. Step7
    * URL 
        * http://10.113.228.131/products
    * Shell Script
        * ./shell_script
 8. Step8
    * URL 
        * http://10.113.228.131/products/graph
    * Javascript Package
        * Angular JS v1.6.1
        * Angular Resource v1.6.1 
        * Angular Chart v1.1.1
    * 사용된 파일 :
        * Front-End
            * ./view/graph.js
            * ./node_moduldes : angular, angular-resource, angular-chart.js
            * ./public/graph/js
        * Back-End
            * ./route/products.js