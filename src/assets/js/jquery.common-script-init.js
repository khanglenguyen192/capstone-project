
/**
* Theme: Highdmin - Responsive Bootstrap 4 Admin Dashboard
* Author: Coderthemes
* SweetAlert

*/
function initModule(element) {
    $(element).tooltip()
}

function createDonutGraph(selector, labels, datas, colors) {
    var data = [{
        label: labels[0],
        data: datas[0]
    },
    {
        label: labels[1],
        data: datas[1]
    },
    {
        label: labels[2],
        data: datas[2]
    }];
    var options = {
        series: {
            pie: {
                show: true,
                innerRadius: 0.7
            }
        },
        legend: {
            position: "sw",
            margin: [0, 0],
            noColumns: 2,
            show: false,
            labelFormatter: function (label, series) {
                return '<div style="font-size:16px;">&nbsp;' + label + '</div>'
            },
            labelBoxBorderColor: null,
            width: 20
        },
        grid: {
            hoverable: true,
            clickable: true
        },
        colors: colors,
        tooltip: true,
        tooltipOpts: {
            content: "%s, %p.0VNĐ"
        }
    };

    $.plot($(selector), data, options);
}

function loadUserSalaryPopover() {
    $('#salaryView').popover({
        trigger: 'focus',
        html: true,
        animation: true,
        placement: 'right',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    })
}

function initSelect2() {
    $(".select2").select2();

    $(".select2-limiting").select2({
        maximumSelectionLength: 2
    });

}

function togglePopover(id) {
    $(id).popover('toggle');
}

function saveFormInputValue() {
    var markup = $('#summernote').summernote('code');
    return markup;
};

function formInputDialogInit(content, hint) {

    $.ajax({
        url: 'https://api.github.com/emojis',
        async: false
    }).then(function(data) {
        window.emojis = Object.keys(data);
        window.emojiUrls = data;
    });;

    $('#summernote').summernote({
        placeholder: hint,
        tabsize: 2,
        height: 400,
        hint: [{
            match: /:([\-+\w]+)$/,
            search: function(keyword, callback) {
                callback($.grep(emojis, function(item) {
                    return item.indexOf(keyword) === 0;
                }));
            },
            template: function(item) {
                var content = emojiUrls[item];
                return '<img src="' + content + '" width="20" /> :' + item + ':';
            },
            content: function(item) {
                var url = emojiUrls[item];
                if (url) {
                    return $('<img />').attr('src', url).css('width', 20)[0];
                }
                return '';
            }
        }]
    });

    $('#summernote').summernote('code', content);
}

function getContentFromSummerNote(id) {
    var markup = $(id).summernote('code');
    return markup;
};

function initSummerNoteTemplate(id, content) {

    $.ajax({
        url: 'https://api.github.com/emojis',
        async: true
    }).then(function(data) {
        window.emojis = Object.keys(data);
        window.emojiUrls = data;
    });;

    $(id).summernote({
        placeholder: '...',
        tabsize: 2,
        height: 300,
        hint: [{
            match: /:([\-+\w]+)$/,
            search: function(keyword, callback) {
                callback($.grep(emojis, function(item) {
                    return item.indexOf(keyword) === 0;
                }));
            },
            template: function(item) {
                var content = emojiUrls[item];
                return '<img src="' + content + '" width="20" /> :' + item + ':';
            },
            content: function(item) {
                var url = emojiUrls[item];
                if (url) {
                    return $('<img />').attr('src', url).css('width', 20)[0];
                }
                return '';
            }
        }, {
            mentions: ['sender : Tên người gửi', 'receiver : Tên người nhận'],
            match: /\B@(\w*)$/,
            search: function(keyword, callback) {
                callback($.grep(this.mentions, function(item) {
                    return item.indexOf(keyword) == 0;
                }));
            },
            template: function(item) {
                return '<span>' + item + '</span>';
            },
            content: function(item) {
                return '{{' + item.toString().charAt(0) + '}}';
            }
        }]
    });

    $(id).summernote('code', content);
}

function initSummerNoteTemplateWithHeight(id, content, height) {

    $.ajax({
        url: 'https://api.github.com/emojis',
        async: true
    }).then(function(data) {
        window.emojis = Object.keys(data);
        window.emojiUrls = data;
    });;

    $(id).summernote({
        placeholder: 'Soạn mẫu email...',
        tabsize: 2,
        height: height,
        hint: [{
            match: /:([\-+\w]+)$/,
            search: function(keyword, callback) {
                callback($.grep(emojis, function(item) {
                    return item.indexOf(keyword) === 0;
                }));
            },
            template: function(item) {
                var content = emojiUrls[item];
                return '<img src="' + content + '" width="20" /> :' + item + ':';
            },
            content: function(item) {
                var url = emojiUrls[item];
                if (url) {
                    return $('<img />').attr('src', url).css('width', 20)[0];
                }
                return '';
            }
        }, {
            mentions: ['sender : Tên người gửi', 'receiver : Tên người nhận'],
            match: /\B@(\w*)$/,
            search: function(keyword, callback) {
                callback($.grep(this.mentions, function(item) {
                    return item.indexOf(keyword) == 0;
                }));
            },
            template: function(item) {
                return '<span>' + item + '</span>';
            },
            content: function(item) {
                return '{{' + item.toString().charAt(0) + '}}';
            }
        }]
    });

    $(id).summernote('code', content);
}

function messageDialogOpening(title, message, okBtntext, okCallback) {
    swal({
        title: title,
        text: message,
        type: 'success',
        confirmButtonClass: 'btn btn-confirm mt-2',
        confirmButtonText: okBtntext
    }).then(function() {
        okCallback();
    }, function() {});

}

function confirmDialogOpening(title, message, confirmBtnText, cancelBtnText, okCallback, cancelCallback) {

    swal({
        title: title,
        text: message,
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-confirm mt-2',
        cancelButtonClass: 'btn btn-cancel ml-2 mt-2',
        confirmButtonText: confirmBtnText,
        cancelButtonText: cancelBtnText
    }).then(function() {
        if (okCallback != undefined) {
            okCallback();
        }

    }, function() {
        if (cancelCallback != undefined)
            cancelCallback();
    })
}

function inputDialogOpening(title, content, typeOfInput, okCallback, cancelCallback, okBtnText, cancelBtnText) {
    swal.setDefaults({
        input: typeOfInput,
        confirmButtonText: okBtnText,
        cancelButtonText: cancelBtnText,
        showCancelButton: true,
        animation: false,
        confirmButtonClass: 'btn btn-confirm mt-2',
        cancelButtonClass: 'btn btn-cancel ml-2 mt-2'
    })

    var steps = [{
        title: title,
        text: content
    }]

    swal.queue(steps).then(function(result) {
        swal.resetDefaults();

        if (okCallback != undefined)
            okCallback(result);

    }, function() {
        swal.resetDefaults();

        if (cancelCallback != undefined)
            cancelCallback();
    })
}

! function($) {
    "use strict";

    var SweetAlert = function() {};



    //examples
    SweetAlert.prototype.init = function() {

            //Basic
            $('#sa-basic').on('click', function() {
                swal({
                    title: 'Any fool can use a computer!',
                    confirmButtonClass: 'btn btn-confirm mt-2'
                }).catch(swal.noop)
            });

            //A title with a text under
            $('#sa-title').click(function() {
                swal({
                    title: "The Internet?",
                    text: 'That thing is still around?',
                    type: 'question',
                    confirmButtonClass: 'btn btn-confirm mt-2'
                })
            });

            //Success Message
            $('#sa-success').click(function() {
                swal({
                    title: 'Good job!',
                    text: 'You clicked the button!',
                    type: 'success',
                    confirmButtonClass: 'btn btn-confirm mt-2'
                })
            });

            //Warning Message
            $('#sa-warning').click(function() {
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-confirm mt-2',
                    cancelButtonClass: 'btn btn-cancel ml-2 mt-2',
                    confirmButtonText: 'Yes, delete it!'
                }).then(function() {
                    swal({
                        title: 'Deleted !',
                        text: "Your file has been deleted",
                        type: 'success',
                        confirmButtonClass: 'btn btn-confirm mt-2'
                    })
                })
            });

            //Parameter
            $('#sa-params').click(function() {
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    confirmButtonClass: 'btn btn-success mt-2',
                    cancelButtonClass: 'btn btn-danger ml-2 mt-2',
                    buttonsStyling: false
                }).then(function() {
                    swal({
                        title: 'Deleted !',
                        text: "Your file has been deleted",
                        type: 'success',
                        confirmButtonClass: 'btn btn-confirm mt-2'
                    })
                }, function(dismiss) {
                    // dismiss can be 'cancel', 'overlay',
                    // 'close', and 'timer'
                    if (dismiss === 'cancel') {
                        swal({
                            title: 'Cancelled',
                            text: "Your imaginary file is safe :)",
                            type: 'error',
                            confirmButtonClass: 'btn btn-confirm mt-2'
                        })
                    }
                })
            });

            //Custom Image
            $('#sa-image').click(function() {
                swal({
                    title: 'Sweet!',
                    text: 'Modal with a custom image.',
                    imageUrl: 'assets/images/logo_sm.png',
                    imageHeight: 50,
                    animation: false,
                    confirmButtonClass: 'btn btn-confirm mt-2'
                })
            });

            //Auto Close Timer
            $('#sa-close').click(function() {
                swal({
                    title: 'Auto close alert!',
                    text: 'I will close in 2 seconds.',
                    timer: 2000,
                    confirmButtonClass: 'btn btn-confirm mt-2'
                }).then(
                    function() {},
                    // handling the promise rejection
                    function(dismiss) {
                        if (dismiss === 'timer') {
                            console.log('I was closed by the timer')
                        }
                    }
                )
            });

            //custom html alert
            $('#custom-html-alert').click(function() {
                swal({
                    title: '<i>HTML</i> <u>example</u>',
                    type: 'info',
                    html: 'You can use <b>bold text</b>, ' +
                        '<a href="//coderthemes.com/">links</a> ' +
                        'and other HTML tags',
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-confirm mt-2',
                    cancelButtonClass: 'btn btn-cancel ml-2 mt-2',
                    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
                    cancelButtonText: '<i class="fa fa-thumbs-down"></i>'
                })
            });

            //Custom width padding
            $('#custom-padding-width-alert').click(function() {
                swal({
                    title: 'Custom width, padding, background.',
                    width: 600,
                    padding: 100,
                    confirmButtonClass: 'btn btn-confirm mt-2',
                    background: '#fff url(//subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png)'
                })
            });

            //Ajax
            $('#ajax-alert').click(function() {
                swal({
                    title: 'Submit email to run ajax request',
                    input: 'email',
                    showCancelButton: true,
                    confirmButtonText: 'Submit',
                    showLoaderOnConfirm: true,
                    confirmButtonClass: 'btn btn-confirm mt-2',
                    cancelButtonClass: 'btn btn-cancel ml-2 mt-2',
                    preConfirm: function(email) {
                        return new Promise(function(resolve, reject) {
                            setTimeout(function() {
                                if (email === 'taken@example.com') {
                                    reject('This email is already taken.')
                                } else {
                                    resolve()
                                }
                            }, 2000)
                        })
                    },
                    allowOutsideClick: false
                }).then(function(email) {
                    swal({
                        type: 'success',
                        title: 'Ajax request finished!',
                        html: 'Submitted email: ' + email,
                        confirmButtonClass: 'btn btn-confirm mt-2'
                    })
                })
            });

            //chaining modal alert
            $('#chaining-alert').click(function() {
                swal.setDefaults({
                    input: 'text',
                    confirmButtonText: 'Next &rarr;',
                    showCancelButton: true,
                    animation: false,
                    progressSteps: ['1', '2', '3'],
                    confirmButtonClass: 'btn btn-confirm mt-2',
                    cancelButtonClass: 'btn btn-cancel ml-2 mt-2'
                })

                var steps = [{
                        title: 'Question 1',
                        text: 'Chaining swal2 modals is easy'
                    },
                    'Question 2',
                    'Question 3'
                ]

                swal.queue(steps).then(function(result) {
                    swal.resetDefaults()
                    swal({
                        title: 'All done!',
                        confirmButtonClass: 'btn btn-confirm mt-2',
                        html: 'Your answers: <pre>' +
                            JSON.stringify(result) +
                            '</pre>',
                        confirmButtonText: 'Lovely!',
                        showCancelButton: false
                    })
                }, function() {
                    swal.resetDefaults()
                })
            });

            //Danger
            $('#dynamic-alert').click(function() {
                swal.queue([{
                    title: 'Your public IP',
                    confirmButtonText: 'Show my public IP',
                    confirmButtonClass: 'btn btn-confirm mt-2',
                    text: 'Your public IP will be received ' +
                        'via AJAX request',
                    showLoaderOnConfirm: true,
                    preConfirm: function() {
                        return new Promise(function(resolve) {
                            $.get('https://api.ipify.org?format=json')
                                .done(function(data) {
                                    swal.insertQueueStep(data.ip)
                                    resolve()
                                })
                        })
                    }
                }])
            });

        },
        //init
        $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
}(window.jQuery),

//initializing
function($) {
    "use strict";
    $.SweetAlert.init()
}(window.jQuery);