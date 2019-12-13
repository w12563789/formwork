<?php
namespace app\controller;

use app\BaseController;

use think\facade\Session;
use think\facade\View;

class Index extends BaseController
{
    public function index()
    {
        $lists =  \app\controller\Auth::getMenuLists();

        $menus['menuInfo']['currency']['child'] = treeData($lists->toArray());

        View::assign('menus',json_encode($menus,true));
        View::assign('user_name',Session::get('name'));

        return View::fetch('index');
    }

}
