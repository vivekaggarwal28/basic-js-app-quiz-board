/**
 * Created by Vivek.Aggarwal on 20-09-2016.
 */
var quiz = quiz || {};

quiz.module = (function ($) {
  "use strict";
  var api, fn, cache = {}, config, $win;

  cache = {
    '$win': $(window),
    'questionData': [],
    'currentQues': {},
    'correct': 0,
    'incorrect': 0
  };

  fn = {
    _init: function (params) {
      config = $.extend(true, {}, cache, params);
      fn._createQuiz();
      document.getElementById("buttons").addEventListener("click", function (e) {

        if (e.target && e.target.tagName == "DIV") {
          fn._check(e.target, cache.currentQues);
          fn._fetchQuiz(cache.currentQues + 1);
        }
      })
    },

    _check: function (ob, quesno) {
      if (ob.getAttribute("value") == cache.questionData[quesno].answer) {
        cache.correct += 1;
      } else {
        cache.incorrect += 1;
      }
    },

    _createQuiz: function () {
      fetch('https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json')
        .then(function (response) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            cache.questionData = data;
            fn._fetchQuiz(0);
          });
        })
    },

    _fetchQuiz: function (num) {
      if (cache.questionData[num] == null) {
        $("#results").find(".total").text(cache.questionData.length);
        $("#results").find(".correct").text(cache.correct);
        $("#results").find(".incorrect").text(cache.incorrect);
        $("section>div").addClass("hidden");
        $("#results").removeClass("hidden");
      } else {
        var html = "<p>Javascript Quiz <span>1</span> of " + cache.questionData.length + "</p>" +
          "<p>" + cache.questionData[num].text + "</p>" +
          "<ul>" +
          "<li>" + cache.questionData[num].options[0] + "</li>" +
          "<li>" + cache.questionData[num].options[1] + "</li>" +
          "<li>" + cache.questionData[num].options[2] + "</li>" +
          "<li>" + cache.questionData[num].options[3] + "</li>" +
          "</ul>"
        document.getElementById('question').innerHTML = html;
        cache.currentQues = num;
      }
    }
  };

  api = {
    init: function () {
      return fn._init.apply(this, arguments);
    }
  };

  return api;
})(window.jQuery);

document.addEventListener("DOMContentLoaded", function (event) {
  quiz.module.init();
});

