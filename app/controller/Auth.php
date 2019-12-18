<?php


namespace app\controller;


use app\BaseController;
use app\model\AuthGroup;
use app\model\AuthGroupAccess;
use app\model\AuthRule;
use think\facade\Request;
use think\facade\Session;
use \think\facade\View;

class Auth extends BaseController
{
    public function index()
    {
        #获取全部权限
        $menus = $this->getMenuLists('*');

        View::assign('menus',json_encode($menus->toArray()));

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
            $request = Request::post();
            try {
                $this->validate($request,[
                    'pid_id'    => 'require',
                    'name'      => 'require',
                    'condition' => 'require',
                    'type'      => 'require',
                ]);

                (new AuthRule())->save([
                    'pid'       => $request['pid_id'],
                    'name'      => $request['name'],
                    'title'     => $request['name'],
                    'condition' => $request['condition'],
                    'type'      => $request['type'],
                    'status'    => 1,
                ]);

                return self::ajaxReturn();

            } catch (\Exception $e) {
                return self::ajaxReturn(202,$e->getMessage());
            }
        }

        return view('form');
    }


    public function getAllMenus()
    {
        $menus = self::getMenuLists()->toArray();

        foreach ($menus as &$menu) {
            $menu['name'] = $menu['title'];
        }
        $menus = treeData2($menus);
        array_unshift($menus,['id' => 0,'name' => '默认顶级']);
        return $menus;
    }

    public function edit()
    {
        if (Request::isPost()) {
            return true;
        }

        $info = (new AuthRule())->findOne('*',['id' => Request::get('id')]);
        View::assign('info',$info);
        return view('form');
    }
}