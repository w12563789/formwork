<?php


namespace app\controller;


use app\BaseController;
use app\model\AuthGroup;
use app\model\AuthGroupAccess;
use app\model\AuthRule;
use think\facade\Request;
use think\facade\Session;

class Auth extends BaseController
{
    public function index()
    {
        #获取全部权限
        $menus = $this->getMenuLists('*');
        \think\facade\View::assign('menus',json_encode($menus->toArray()));
        return view('menu');
    }


    static function getMenuLists($type = 1) : object
    {
        #获取权限组id
        $group_id = (new AuthGroupAccess())->findValue('group_id',['uid'=>Session::get('id')]);

        #获取权限id
        $auth_ids = (new AuthGroup())->findValue('rules',['id' => $group_id,'status'=>1]);

        #获取权限列表
        $condition[] = ['id','in',$auth_ids];
        if ($type != '*') {
            $condition[] = ['type','=',$type];
        }
        return (new AuthRule())->findAll('*',$condition);
    }

    public function add()
    {
        if (Request::isPost()) {

        }

        return view('form');
    }

}