<?php


namespace app\controller;


use app\model\User;

use think\facade\Request;
use think\facade\Session;

class Login
{
    /**
     * 登录方法
     */
    public function login()
    {
        if (Request::isPost()) {
            $request = Request::post();
            #验证码验证
//            if(!captcha_check($request['captcha'])){
//                return self::ajaxReturn(201,'验证码错误');
//            }

            #查询用户信息
            $user_infos = (new User())->findOne('*',['user_name'=>$request['username']]);

            if ($user_infos['user_pwd'] != base64_encode(md5($request['password']))) {
                return json(['code' => 202, 'message' => '用户名或密码错误']);
            }

            Session::set('id',$user_infos->id);
            Session::set('name',$user_infos->name);

            return json(['code' => 200, 'message' => '成功']);
        }

        return view();
    }


    public function verify()
    {
        return Captcha::create();
    }
}