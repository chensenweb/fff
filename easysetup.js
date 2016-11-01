(function ($) {
    function CheckExpire()
    {
        $.ajax({
            type: 'POST',
            url: '/check_expire.cgi',
            data: '',
            dataType: "json"
        }).done(function (exp) {
            if (exp.expired != "no")
            {
                window.location.reload();
            }
        })
    }
    function CheckGpon()
    {
        $.ajax({
            type: 'POST',
            url: '/easy_setup.cgi?ConnectStatus',
            data: '',
            dataType: "json"
        })
                .done(function (exp) {
                    console.log(exp.GponStatus);
                    if (exp.GponStatus != "1") {
                        url = "/easy_setup.cgi?pon";
                        window.location.replace(url);
                    } else if (exp.ConnectionStatus != "Connected") {
                        url = "/easy_setup.cgi?wanIp";
                        window.location.replace(url);
                    }
                })
    }
    $(document).ready(function () {
        var i = function () {
            var t = $.post("../easy_setup.cgi?getValue", function (a) {
            	alert(a);
                var d = $.parseJSON(a);
                console.log(d);
                for (i = 1; i < 5; i++)
                {
                    $("#port_staus").append('<div class="col-xs-3" id="LAN' + i + '"><div><p class="text-center">' + "LAN" + i + '</p></div><div class="list-horizontal-item"><img src="img_glb/lan.png" alt="client"></div></div>');
                }
                $.each(d, function (index, value) {
                    switch (index) {
                        case "internet_pppoe":
                            //console.log(value);
                            $("#internet_username").val(value[0].name);
                            $("#internet_password").val(value[0].password);
                            $('#internet-submit').prop('disabled', false);
                            break;
                        case "voip_pppoe":
                            $("#voip_username").val(value[0].name);
                            $("#voip_password").val(value[0].password);
                            $('#voip-submit').prop('disabled', false);
                            break;
                        case"wifi":
                            $.each(value, function (i, v) {
                                $("#wifi_ssid_select").append('<option value=' + (i + 1) + '>SSID' + (i + 1) + '</option>');
                            });
                            $("#wifi_ssid").val(value[0].wifi_ssid);
                            $("#wifi_password").val(value[0].wifi_password);
                            $("#wifi_ssid_select").change(function () {
                                // alert($(this).val());
                                $("#wifi_ssid").val(value[$(this).val() - 1].wifi_ssid);
                                $("#wifi_password").val(value[$(this).val() - 1].wifi_password);
                            });
                            break;
                        case"admin":
                            $("#admin_password").val(value[0].password);
                            break;
                        case"dhcp":
                            (value[0].DHCPServerEnable == "1") ? $("#dhcp-checkbox").prop("checked", true) : $("#dhcp-checkbox").prop("checked", false);
                            break;
                        case "dns":
                            $("#dns1").val(value[0].dns1);
                            $("#dns2").val(value[1].dns2);
                            $("#dns3").val(value[2].dns3);
                            break;
                        case "lan":
                            console.log(value);
                            $.each(value, function (i, v) {
                               
							$("#"+i).find('img').after('<div><p class="text-center">' + v.HostName + '</p></div>');
                           
                            $("#"+i).find('img').addClass("button button-glow button-box button-action button-jumbo");
                            
                            $(".lan-table").find('tbody').append('<tr><td>' + i + '</td><td>' + v.Service + '</td><td>' + v.vlanid + '</td><td>' + v.priority + '</td><td>' + v.HostName + '</td></tr>');
                            })
                            break;
                    }
                });
            });
            return t;
        }();
        //console.log(i);

        $('input[type="checkbox"]').on('change', function (e) {

            $('#myModal2').modal();

        });


        var activePassword = (function () {
            return{
                replace: function ($this, id, name, bind) {
                    $this.html('<input class="form-control" id=' + id + '  name=' + name + ' type="password" /><span class="glyphicon icon-eye ' + bind + '"></span>');
                },
                showEye: function (bind) {
                    $(bind).show();
                },
                hideEye: function (bind) {
                    $(bind).hide();
                }
            };
        }());



        $("#pwd-internet").dblclick(function () {
            activePassword.replace($(this), "internet_password", "internet_password", "glyphicon-eye-open1");
            //$(this).html('<input class="form-control" id="internet_password"  name="internet_password" type="password" /><span class="glyphicon glyphicon-eye-open glyphicon-eye-open1"></span>');
        });

        $("#pwd-internet").delegate('input', 'keyup', function () {
            if ($(this).val()) {
                //$(".glyphicon-eye-open1").show();
                activePassword.showEye(".glyphicon-eye-open1");
            } else {
                //$(".glyphicon-eye-open1").hide();
                activePassword.hideEye(".glyphicon-eye-open1");
            }
        });
        $("#pwd-internet").delegate('span', 'mousedown', function () {
            $("#internet_password").attr('type', 'text');
        }).mouseup(function () {
            $("#internet_password").attr('type', 'password');
        }).mouseout(function () {
            $("#internet_password").attr('type', 'password');
        });


        $("#pwd-voip").dblclick(function () {
            activePassword.replace($(this), "voip_password", "voip_password", "glyphicon-eye-open2");
            //$(this).html('<input class="form-control" id="internet_password"  name="internet_password" type="password" /><span class="glyphicon glyphicon-eye-open glyphicon-eye-open1"></span>');
        });


        $("#pwd-voip").delegate('input', 'keyup', function () {
            if ($(this).val()) {
                $(".glyphicon-eye-open2").show();
            } else {
                $(".glyphicon-eye-open2").hide();
            }
        });
        $("#pwd-voip").delegate('span', 'mousedown', function () {
            $("#voip_password").attr('type', 'text');
        }).mouseup(function () {
            $("#voip_password").attr('type', 'password');
        }).mouseout(function () {
            $("#voip_password").attr('type', 'password');
        });

    });

    var showMsg = function (type, msg) {
        var $msg = $('#msg');
        var top = $(document).scrollTop() + $(window).height() / 2;
        if ($msg.length === 0) {
            $msg = $('<span id="msg" style="font-weight:bold;position:absolute;top:' + top + 'px;left: 50%;z-index:9999"></span>');
            $('body').append($msg);
        }
        //console.log($msg);
        $msg.stop(true).attr('class', 'alert alert-' + type).text(msg).css('margin-left', -$msg.outerWidth() / 2).fadeIn(500).delay(2000).fadeOut(500);
    };
    $("form.form-pppoe").submit(function () {
        $data = $('form.form-pppoe').serialize();
        alert($data);
        console.log($data);
        $.post("../easy_setup.cgi?PPPoEconfig", $data, function (a) {
//            console.log(a);
//            if (a === "success") {
//                //alert("<%t('The length of pin code must be 8 number')%>");
//                showMsg("success", "change internet ok");
//            } else {
//                showMsg("success", "change internet nok");
//            }
        }).done(function (a) {
            console.log(a);
            if (a === "success") {
                showMsg("success", "change internet ok");
            } else {
                showMsg("success", "change internet nok");
            }
        });
        return false;
    });
    $("form.form-voip").submit(function () {
        $data = $('form.form-voip').serialize();
        //alert($data);
        $.post("../easy_setup.cgi?VOIPconfig", $data, function (a) {
//            console.log(a);
//            if (a === "success") {
//                showMsg("success", "change Voip ok");
//            } else {
//                showMsg("success", "change Voip nok");
//            }
        }).done(function (a) {
            console.log(a);
            if (a === "success") {
                showMsg("success", "change Voip ok");
            } else {
                showMsg("success", "change Voip nok");
            }
        });
        return false;
    });

    $("form.form-dns").submit(function () {
        $data = $('form.form-dns').serialize();
        // alert($data);
        $.post("../easy_setup.cgi?configDNS", $data, function (a) {
            if (a === "success") {
                showMsg("success", "change DNS ok!");
            }
        });
        return false;
    });

    $("form.form-wifi").submit(function () {
        $data = $('form.form-wifi').serialize();
        //alert($data);
        $.post("../easy_setup.cgi?wifiConfig", $data, function (a) {
			
            if (a === "success") {
                showMsg("success", "change ok!");
            }
        });
        return false;
    });

    $("#rebootValide").click(function () {
        $.post("../easy_setup.cgi?reboot", "valide=1", function (a) {
            if (a === "success") {
                showMsg("success", "reboot ok!");
                $("#myModal").modal("hide");
                window.location.replace("/login.cgi?out");
            } else {
                showMsg("success", "reboot Nok!");
            }
        });
    });

    var validation = (function () {
        return {
            isEqual: function (val1, val2) {
                return val1 === val2;
            }
        };
    }());

    $("form.form-adminPasswd").submit(function () {
        if (!validation.isEqual($('#admin_password').val(), $('#admin_re_entry').val())) {
            //alert("two input not the same");
            $("#collapseFive").find("div:first").addClass("has-error");
            $("#collapseFive").find("div:first").next().addClass("has-error");
            return false;
        }
        $data = $('form.form-adminPasswd').serialize();
        alert($data);
        $.post("../easy_setup.cgi?set", $data, function (a) {
            if (a === "success") {
                showMsg("success", "change ok!");
            }
        });
        return false;
    });
	
	$("#Advance").click(function(){
		
        /*$.post("../index.cgi?Advance", function (a) 
		{
			console.log(a);
		});*/
		//$.load("html_glb/main.html");
		location.href = "index.cgi?Advance";
		
	});
})(this.jQuery);
