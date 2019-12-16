
//通用post请求方法
var message = '正在处理...';

var page = [20,50,100,200,400,600,800,1000];

var default_page = 100;

var publicMethod = {
    //表单提交
    "post" : function (params){
        var index = layer.msg(message,{shade: [0.8, '#393D49']});
        $.post(params.url,params.post_data,function(res){
            layer.close(index);
            if(res.code == 200){
                layer.closeAll();
                layer.msg(res.message);
                var table = layui.table;
                if (params.table_name == 'reload') {
                    window.location.reload();
                }else {
                    table.reload(params.table_name);
                }

            } else {
                layer.msg(res.message);
            }
        },'json');
    },
    'export' : function (params) {
        var index = layer.msg(message,{shade: [0.8, '#393D49']});
        $.post(params.exp_url,params.post_data,function(res){
            layer.close(index);
            if(res.code == 200){
                document.location.href = params.exp_url+'?'+params.exp_data;
            } else {
                layer.msg(res.message);
            }
        },'json');
    },
    //启动/禁用
    "change_status" : function (params){
        var index = layer.msg(message,{shade: [0.8, '#393D49']});
        var selectIfKey = params.obj.othis;
        // 获取当前所在行
        var parentTr = selectIfKey.parents("tr");
        var ifKey = parentTr.find(('td:eq('+params.key+')')).text().trim();

        if (params.obj.elem.checked == true) {
            post_data = {'status' : 1, 'id' : ifKey};
        } else {
            post_data = {'status' : 0, 'id' : ifKey};
        }
        $.post(params.url,post_data,function(res){
            layer.close(index);
            layer.msg(res.message);
            if(res.code != 200){
                if (params.obj.elem.checked == true) {
                    $(params.that).prop('checked',false)
                }else {
                    $(params.that).prop('checked',true)
                }
            }
            var form=layui.form;
            form.render();
        },'json');
    },
    //刷新
    "refresh" : function (table_name) {
        var table = layui.table;
        table.reload(table_name);
    },
    //编辑
    "edit_method" : function (params,width='500px',height='300px',type =2) {
        layui.layer.open({
            title   : params.title,
            area    : [width, height],
            type    : type,
            method  : 'get',
            content : params.url+'?id='+params.data.id+'&nm='+params.data.nm,
            btn     : ['保存', '取消'],
            yes     : function(index, layero){
                var w = $(layero).find("iframe")[0].contentWindow;//通过该对象可以获取iframe中的变量，调用iframe中的方法
                var dou = w.document;
                //获取表单数据
                params.post_data = $(dou).find('form').serializeArray();//获取表单中所有的值

                publicMethod.post(params);

            },
            btn2: function(index, layero){
                var w = $(layero).find("iframe")[0].contentWindow;//通过该对象可以获取iframe中的变量，调用iframe中的方法
                var dou = w.document;
                //获取表单数据
                var form_data = $(dou).find('form').serializeArray();//获取表单中所有的值
                var has_hidden_data = $(dou).find('#hidden').val();//判断只有cust_id的添加
                var is_null = true;

                if (has_hidden_data === undefined){

                    $.each(form_data, function(key, val) {
                        if (val.name == 'cust_id'){
                            return true;
                        }
                        if (val.value != '') {
                            is_null = false;
                        }
                    });
                }else{
                    var hidden_data = JSON.parse($(dou).find('#hidden').val());//获取表单中隐藏的值,便于对比
                    $.each(form_data, function(key, val) {
                        //当表格中的值和以前的数据不一样时,将标识符改为false,取消时弹出确认框
                        //判断条件加undefined是为了不对比一些隐藏的值
                        if (hidden_data[val.name] != undefined && val.value != hidden_data[val.name]) {
                            is_null = false;
                        }
                    });
                }


                if (!is_null) {
                    layer.confirm('是否放弃本次操作？', {
                        time : 0, //不自动关闭
                        btn  : ['确定', '取消'],
                        yes  : function(){
                            layer.close(layer.index);
                            layer.close(index);
                        }
                    });
                    return false; //不加此代码会让弹出的form表单自动关闭
                }

            },
            cancel: function(index, layero){
                var w = $(layero).find("iframe")[0].contentWindow;//通过该对象可以获取iframe中的变量，调用iframe中的方法
                var dou = w.document;
                //获取表单数据
                var form_data = $(dou).find('form').serializeArray();//获取表单中所有的值
                var is_null = true;
                var has_hidden_data = $(dou).find('#hidden').val();//判断只有cust_id的添加
                if (has_hidden_data === undefined){
                    $.each(form_data, function(key, val) {
                        if (val.name == 'cust_id'){
                            return true;
                        }
                        if (val.value != '') {
                            is_null = false;
                        }
                    });
                }else {
                    var hidden_data = JSON.parse($(dou).find('#hidden').val());//获取表单中隐藏的值,便于对比
                    //当表格中的值和以前的数据不一样时,将标识符改为false,取消时弹出确认框
                    //判断条件加undefined是为了不对比一些隐藏的值
                    $.each(form_data, function (key, val) {
                        if (hidden_data[val.name] != undefined && val.value != hidden_data[val.name]) {
                            is_null = false;
                        }
                    });
                }
                if (!is_null) {
                    layer.confirm('是否放弃本次操作？', {
                        time : 0, //不自动关闭
                        btn  : ['确定', '取消'],
                        yes  : function(){
                            layer.close(layer.index);
                            layer.close(index);
                        }
                    });
                    return false; //不加此代码会让弹出的form表单自动关闭
                }
            }
        })
    },
    //去后台请求数据
    "request_data" : function (params) {
        var index = layer.msg(message,{shade: [0.8, '#393D49']});
        $.post(params.url,params.post_data,function(res){
            layer.close(index);
            layer.msg(res.message);
            if(res.code == 200){
                table.reload(params.table_name);
            }
        },'json');
    },
    //点击新增按钮时
    "add_method" : function (params,width='500px',height='300px',type =2) {
        layui.layer.open({
            title   : params.title,
            area    : [width, height],
            type    : type,
            method  : 'get',
            content : params.url,
            btn     : ['保存', '取消'],
            yes     : function(index, layero){
                var w = $(layero).find("iframe")[0].contentWindow;//通过该对象可以获取iframe中的变量，调用iframe中的方法
                var dou = w.document;
                //获取表单数据
                params.post_data = $(dou).find('form').serializeArray();//获取表单中所有的值
                publicMethod.post(params);

            },
            btn2: function(index, layero){

            },
            cancel: function(index, layero){

            }
        })
    },
    //点击查看按钮时
    "view_method" : function (params,width='500px',height='300px',type =2) {
        layui.layer.open({
            title   : params.title,
            area    : [width, height],
            type    : type,
            method  : 'get',
            content : params.url+'?id='+params.data.id,
            btn     : ['关闭'],
            yes     : function(index, layero){
                layer.close(index);
            },
            cancel: function(index, layero){
                layer.close(index);
            }
        })
    },
    //删除方法
    "del_method":function (params) {
        layer.confirm('是否确定删除操作？', {
            time : 0, //不自动关闭
            btn  : ['确定', '取消'],
            yes  : function(){
                publicMethod.post(params);
            }
        });
        return false; //不加此代码会让弹出的form表单自动关闭
    },
    'check_require':function () {

    },
    'auth_edit':function (params) {
        layui.layer.open({
            title   : params.title,
            area    : ['850px', '600px'],
            type    : 2,
            method  : 'get',
            content : params.url+'?id='+params.data.id,
            btn     : ['保存', '取消'],
            yes     : function(index, layero){
                var w = $(layero).find("iframe")[0].contentWindow;//通过该对象可以获取iframe中的变量，调用iframe中的方法
                var dou = w.document;
                //获取表单数据
                var data = $(dou).find('form').serializeArray();//获取表单中所有的值
                params.post_data = data;

                publicMethod.post(params);

            },
            btn2: function(index, layero){
                var w = $(layero).find("iframe")[0].contentWindow;//通过该对象可以获取iframe中的变量，调用iframe中的方法
                var dou = w.document;
                //获取表单数据
                var form_data = $(dou).find('form').serializeArray();//获取表单中所有的值

                var status = publicMethod.is_cancel(form_data);

                if (status) {
                    layer.confirm('是否放弃本次操作？', {
                        time : 0, //不自动关闭
                        btn  : ['确定', '取消'],
                        yes  : function(){
                            layer.close(layer.index);
                            layer.close(index);
                        }
                    });
                    return false; //不加此代码会让弹出的form表单自动关闭
                }

            },
            cancel: function(index, layero){
                var w = $(layero).find("iframe")[0].contentWindow;//通过该对象可以获取iframe中的变量，调用iframe中的方法
                var dou = w.document;
                //获取表单数据
                var form_data = $(dou).find('form').serializeArray();//获取表单中所有的值
                var status = publicMethod.is_cancel(form_data);

                if (status) {
                    layer.confirm('是否放弃本次操作？', {
                        time : 0, //不自动关闭
                        btn  : ['确定', '取消'],
                        yes  : function(){
                            layer.close(layer.index);
                            layer.close(index);
                        }
                    });
                    return false; //不加此代码会让弹出的form表单自动关闭
                }
            }
        })
    },

    'is_cancel':function (data) {
        var is_power_type = true;
        var is_user_rules = true;
        for(var i= 0;i<data.length;i++){
            if (data[i]['name'] == 'power_type') {
                is_power_type = false;
            }
            if (data[i]['name'] == 'user_rules') {
                is_user_rules = false;
            }
        }
        if (is_power_type || is_user_rules) {
            return false;
        }
        var power  = false;
        var rule   = false;
        //隐藏数据权限与预提交的权限对比
        if (data[0].value != data[3].value) {
            power = true
        }
        var arr1 =data[2].value.split(',');
        var arr2 =data[4].value.split(',');


        //去除数组中的空字符串
        for(var i = 0;i<arr1.length;i++){
            if(arr1[i]==''||arr1[i]==null||typeof(arr1[i])==undefined){
                arr1.splice(i,1);
                i=i-1;
            }
        }

        for(var i = 0;i<arr2.length;i++){
            if(arr2[i]==''||arr2[i]==null||typeof(arr2[i])==undefined){
                arr2.splice(i,1);
                i=i-1;
            }
        }
        var diff = arr1.concat(arr2).filter(function (v) {
            return arr1.indexOf(v)===-1 || arr2 .indexOf(v)===-1
        })
        if (diff.length > 0) {
            rule = true;
        }

        if (rule || power) {
            return true;   //提示是否取消
        } else {
            return false;  //不提示
        }
    }

}

