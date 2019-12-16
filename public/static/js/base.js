function ajax() {
    $.ajax({
        url: '/user/changePwd',
        type: 'post',
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function (data) {
            if (data == 'success') {
                layer.msg("密码修改成功");
                location.href = "/user/loginpage"
            } else {
                layer.msg("密码修改失败")
            }
        },
        error: function () {
            layer.msg("密码修改失败")
        }
    })
}


function form() {
    //页面层
    layer.open({
        title: '添加站点',
        type: 1,
        area: ['700px', '400px'],
        content: 'auth/form',
        btnAlign: 'c',
        btn: ['确定', '取消'],
        yes: function (index, layero) {
            var str = $("input[name=isIndividual]").val();
            if (str == "on") {
                str = "1";
            } else {
                str = "0";
            }

            if ($("input[name=siteName]").val() == null || $("input[name=siteName]").val() == "") {
                layer.msg('请输入站点名称', {icon: 5, time: 2000, area: '200px', type: 0, anim: 6,}, function () {
                    $("input[name=siteName]").focus();
                });
                return false;
            } else if ($("input[name=fileRecord]").val() == null || $("input[name=fileRecord]").val() == "") {
                layer.msg('请输入备案号', {icon: 5, time: 2000, area: '200px', type: 0, anim: 6,}, function () {
                    $("input[name=fileRecord]").focus();
                });
                return false;
            } else if ($("input[name=type]").val() == null || $("input[name=type]").val() == "") {
                layer.msg('请输入平台信息', {icon: 5, time: 2000, area: '200px', type: 0, anim: 6,}, function () {
                    $("input[name=type]").focus();
                });
                return false;
            } else if ($("input[name=sitePhone]").val() == null || $("input[name=sitePhone]").val() == "") {
                layer.msg('请输入联系电话', {icon: 5, time: 2000, area: '200px', type: 0, anim: 6,}, function () {
                    $("input[name=sitePhone]").focus();
                });
                return false;
            }
            var formData = {
                siteName: $("input[name=siteName]").val(),
                fileRecord: $("input[name=fileRecord]").val(),
                type: $("input[name=type]").val(),
                sitePhone: $("input[name=sitePhone]").val(),
                siteMark: $("textarea[name=siteMark]").val()
            };
            console.log(formData);
            $.post('${pageContext.request.contextPath}/leaguer/addSite', formData, function (data) {
                //判断是否发送成功
                if (data.code == 200) {
                    layer.msg(data.message);
                    layer.close(index);
                    parent.document.getElementById('my_iframe').contentWindow.location.reload(true);
                } else {
                    layer.msg("保存失败...", {type: 1});
                }
            })
        }, btn2: function (index, layero) {
            layer.msg("取消");
            //return false 开启该代码可禁止点击该按钮关闭
        }, cancel: function () {
            layer.msg("关闭窗口");
            //右上角关闭回调
            //return false 开启该代码可禁止点击该按钮关闭
        },
        success: function () {
            layui.use('form', function () {
                var form = layui.form; //只有执行了这一步，部分表单元素才会修饰成功
                form.render('checkbox');
                form.on('checkbox(istrue)', function (data) {
                    /* if(data.elem.checked){
                     emailConfig['isenterprise']=1;
                     }; //是否被选中，true或者false*/
                });
            });
        }
    });
}