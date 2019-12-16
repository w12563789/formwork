<?php /*a:1:{s:33:"/yd/php/tp6.0/view/auth/form.html";i:1576487854;}*/ ?>
<link rel="stylesheet" href="/tp6.0/public/static/lib/layui-v2.5.4/css/layui.css" media="all">
<link rel="stylesheet" href="/tp6.0/public/static/css/public.css" media="all">
<script src="/tp6.0/public/static/lib/layui-v2.5.4/layui.js" charset="utf-8"></script>
<form class="layui-form" action="">
    <div class="layui-form-item">
        <label class="layui-form-label">父级节点：</label>
        <div class="layui-input-inline">
            <input type="text" id="tree" lay-filter="tree" class="layui-input" lay-verify="required">
            <input type="hidden" id="pid_id" name="pid_id">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">权限名称：</label>
        <div class="layui-input-inline">
            <input name="name" autocomplete="off" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">权限标识：</label>
        <div class="layui-input-inline">
            <input type="condition" class="layui-input">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">权限类型：</label>
        <div class="layui-input-block">
            <input type="radio" name="type" value="1" title="菜单">
            <input type="radio" name="type" value="2" title="按钮" checked>
        </div>
    </div>
</form>
<script src="/tp6.0/public/static/js/jquery.js?v=1.0.4" charset="utf-8"></script>
<script>
    layui.config({
        base: '/tp6.0/public/static/js/lay-module/' //treeSelect.js所在的目录
    }).extend({ //设定模块别名
        treeSelect: 'treeSelect/treeSelect'
    }).use(['treeSelect','jquery'], function () {
        var treeSelect = layui.treeSelect;
        treeSelect.render({
            // 选择器
            elem: '#tree',
            // 数据
            data: 'menus',
            // 异步加载方式：get/post，默认get
            type: 'get',
            // 占位符
            placeholder: '修改默认提示信息',
            // 是否开启搜索功能：true/false，默认false
            search: true,
            // 一些可定制的样式
            style: {
                folder: {
                    enable: true
                },
                line: {
                    enable: true
                }
            },
            // 点击回调
            click: function(d){
                $('#pid_id').val(d.current.id)
            },

        });

    });

</script>