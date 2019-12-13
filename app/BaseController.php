<?php
declare (strict_types = 1);

namespace app;

use app\model\AuthGroupAccess;
use app\model\AuthRule;
use think\App;
use think\exception\ValidateException;
use think\facade\Session;
use think\facade\View;
use think\response\Html;
use think\Validate;

/**
 * 控制器基础类
 */
abstract class BaseController
{
    /**
     * Request实例
     * @var \think\Request
     */
    protected $request;

    /**
     * 应用实例
     * @var \think\App
     */
    protected $app;

    /**
     * 是否批量验证
     * @var bool
     */
    protected $batchValidate = false;

    /**
     * 控制器中间件
     * @var array
     */
    protected $middleware = ['Check.login'];

    /**
     * 构造方法
     * @access public
     * @param  App  $app  应用对象
     */
    public function __construct(App $app)
    {
        $this->app     = $app;
        $this->request = $this->app->request;

        // 控制器初始化
        $this->initialize();
    }

    // 初始化
    protected function initialize()
    {
//        #获取当前控制器/方法
//        $contro = \think\facade\Request::controller();
//        $action = \think\facade\Request::action();
//
//        #获取权限ids
//        $join = [
//            ['auth_group b','b.id = a.group_id']
//        ];
//        $condition = ['a.uid' => Session::get('id')];
//        $rule_ids = (new AuthGroupAccess())->findValue('b.rules',$condition,$join);
//
//        #获取页面按钮
//        $where[] = ['id','in',$rule_ids];
//        $where[] = ['condition','=',$contro.'/'.$action];
//        $AuthRule = new AuthRule();
//        $auth_is = $AuthRule->findValue('id',$where);
//
//
//        if (is_null($auth_is) && !in_array($contro.'/'.$action,config('app.exemption_route'))) {
//            return Html::create('没有操作权限','html',301);
//        }
//
//        #抛向前台
//        if (!is_null($auth_is)) {
//            $buttons = $AuthRule->findAll('*',['type'=>2,'pid'=>$auth_is]);
//            View::assign('buttons',$buttons);
//        }

    }

    /**
     * 验证数据
     * @access protected
     * @param  array        $data     数据
     * @param  string|array $validate 验证器名或者验证规则数组
     * @param  array        $message  提示信息
     * @param  bool         $batch    是否批量验证
     * @return array|string|true
     * @throws ValidateException
     */
    protected function validate(array $data, $validate, array $message = [], bool $batch = false)
    {
        if (is_array($validate)) {
            $v = new Validate();
            $v->rule($validate);
        } else {
            if (strpos($validate, '.')) {
                // 支持场景
                list($validate, $scene) = explode('.', $validate);
            }
            $class = false !== strpos($validate, '\\') ? $validate : $this->app->parseClass('validate', $validate);
            $v     = new $class();
            if (!empty($scene)) {
                $v->scene($scene);
            }
        }

        $v->message($message);

        // 是否批量验证
        if ($batch || $this->batchValidate) {
            $v->batch(true);
        }

        return $v->failException(true)->check($data);
    }


    static function ajaxReturn(int $code = 200, string $message = '成功'):object
    {
        return json(['code' => $code, 'message' => $message]);
    }

    static function layuiReturn(array $data):array
    {
        return [
            'code'  => 0,
            'data'  => $data['data'],
            'count' => $data['total'],
            'msg'   => '成功'
        ];
    }

}
