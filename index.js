/* eslint-disable no-undef */
$(function() {
  var $open = $('#sc-openPrice')
  var $support = $('#sc-supportPrice')
  var $stop = $('#sc-stop')
  var $chance = $('#sc-chance')
  var $cash = $('#sc-buyCash')
  var $quant = $('#sc-quant')
  var $money = $('#sc-money')
  var $stopPrice = $('#sc-stopPrice')
  var $buyPrice = $('#sc-buyP')
  var $predictedRisk = $('#scPredictedRisk')
  var $predictedLoss = $('#scPredictedLoss')
  var $compartment = $('#scCompartment')
  var $btnOpenPrice = $('#scBtnClearOpenPrice');
  var $btnSupportPrice = $('#scBtnClearSupportPrice');

  $chance.val(0.5)
  $stop.val(2)
  $cash.val(600000)
  $compartment.val(3)

  $open.on('change', renderRes)
  $support.on('change', renderRes)
  $stop.on('change', renderRes)
  $chance.on('change', renderRes)
  $cash.on('change', renderRes)

  $btnOpenPrice.on('click', clearOpenPrice)
  $btnSupportPrice.on('click', clearSupportPrice)

  function clearOpenPrice() {
    $open.val('')
  }

  function clearSupportPrice() {
    $support.val('')
  }

  function renderRes() {
    if ($open.val() && $support.val() && $stop.val() && $chance.val() && $cash.val()) {
      renderCalc()
      $('.alert').show()
    } else {
      $('.alert').hide()
    }
  }

  function renderCalc() {
    const res = calc(
      $open.val(),
      $support.val(),
      $stop.val(),
      $chance.val(),
      $cash.val(),
      $compartment.val()
    )
    $quant.text(res[0])
    $money.text(res[1])
    $stopPrice.text(res[2].toFixed(2))
    $buyPrice.text($open.val())
    $predictedRisk.text(res[3].toFixed(2))
    $predictedLoss.text(res[4].toFixed(2))
  }

  function calc(open, support, stop, chance, cash, compartment) {
    var o = +open
    var s = +support
    var ss = +stop
    var c = +chance
    var cc = +cash
    compartment = +compartment;

    var sss = (support - (open * ss) / 100)
    var quant = cc * (c / compartment) / 100 / (open - sss)
    var qq = Math.floor(quant / 100) * 100
    var ccc = qq * o
    var predictedRisk = qq * (open - sss) / cc * 100
    var predictedLoss = qq * (open - sss)

    return [qq, ccc, sss, predictedRisk, predictedLoss]
  }
})
