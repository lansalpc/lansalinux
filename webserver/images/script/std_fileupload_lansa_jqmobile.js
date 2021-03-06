﻿/*!
	(c) 2014 LANSA
	jQuery File upload plugin weblet
	$Workfile:: std_fileupload_lansa_jqmobile.js $
	$UTCDate:: 2014-03-14 03:37:48Z  $
	$Revision:: 5                    $

	Based on:
	jQuery File Upload Plugin Basic Plus Demo 1.3.5
	https://github.com/blueimp/jQuery-File-Upload

	Copyright 2013, Sebastian Tschan
	https://blueimp.net
 
	Licensed under the MIT license:
	http://www.opensource.org/licenses/MIT
*/

//Initialize file upload weblets
(function() {
	jQuery(document).on("pagecreate", "body", function() {Lstd.Weblets.stdFileUpload.init();});
})();

// File upload weblet

Lstd.Weblets.stdFileUpload = {
	init: function() {
		Lstd.I18n.init();

		jQuery("div.std_fileupload").each(function(i, elem) {
			var $elem = jQuery(elem),
				id = $elem.data("lstdfileupload-id"),
				$input = jQuery(Lstd.Utils.makeSafeId(id)),
				isDisabled = ($input.attr("disabled") === "disabled"),
				uploadWamName = $input.data("lansawam"),
				uploadWrName = $input.data("lansawr"),
				http = Lstd.Weblets.stdFileUpload.httpRequest(uploadWamName, uploadWrName, ("__" + id + "_FORM")),
				lansaweb = http.getURL(),
				maxSizeMb = $input.data("lstdmaxfilesize"),
				maxSize = maxSizeMb * 1000000,
				maxNumber = $input.data("lstdmaxnumberoffiles"),
				extraFields = $input.data("lansaextrafields"),
				$span = $elem.find("span.fileinput-button"),
				$caption = $span.find("span"),
				$container = jQuery(Lstd.Utils.makeSafeId("__" + id + "_FILES")).find("tbody"),
				useAjax = $input.data("lstduseajax"),
				pb = "__" + id + "_PROGRESS",
				btnClass = "lstd_button" + (($input.data("lstdclass") != undefined) ? (" " + $input.data("lstdclass")) : ""),
				successCB = ($input.data("lstdsuccesscallback") != undefined) ? window[$input.data("lstdsuccesscallback")] : null,
				failCB = ($input.data("lstdfailcallback") != undefined) ? window[$input.data("lstdfailcallback")] : null;

			if (($caption.text() == "Default") || ($caption.text() == "")) {
				$caption.text(Lstd.I18n.getString("SelectFiles"));
			}

			$span.button({enhanced: true, disabled: isDisabled});
			$span.button("refresh");
			Lstd.Weblets.stdProgressBar.init(pb, {value: 0, transitory: true, delayClose: 200});

			$input.fileupload({
				url: lansaweb,
				dataType: 'json',
				autoUpload: false,
				maxFileSize: maxSize,
				maxNumberOfFiles: maxNumber,
				add: function(e, data) {
					jQuery.each(data.files, function (index, file) {
						var count = $container.children("tr").length;

						// Validate
						if (count >= maxNumber) {
							errFlag = true;
							var msgText = (maxNumber == 1) ? Lstd.I18n.getString("OnlyOneFile") : Lstd.I18n.getString("TooManyFiles", maxNumber);
							setTimeout(function() { alert(msgText) }, 1);
						}
						else if (file.size && (file.size > maxSize)) {
							errFlag = true;
							setTimeout(function() { alert(Lstd.I18n.getString("MaxFileSize", maxSizeMb, file.name)) }, 1);
						}
						else {
							var $uploadBtn = Lstd.Weblets.stdFileUpload.uploadBtnFactory(btnClass, pb, failCB);

							data.context = jQuery("<tr/>").appendTo($container);
							var $row = data.context;
							$row.append(jQuery("<td/>").text(file.name));
							$row.append(jQuery("<td/>").append($uploadBtn.data(data)));
						}
					});
				},
				submit: function (e, data) {
					Lstd.Fields.insertExtraFields(http.form, (extraFields ? extraFields : []));
					data.formData = jQuery(http.form).serializeArray();
					return true;
				},
				done: function (e, data) {
					if (typeof successCB == "function") {
						try {
							successCB(e, Lstd.Json.factory(data.result));
						}
						catch (err) {
							console.error(err);
						}
					}
				},
				fail: function (e, data) {
					var responseText = data.jqXHR ? (data.jqXHR.responseText ? data.jqXHR.responseText : null) : null;
					Lstd.Weblets.stdFileUpload.fail(failCB, e, responseText, data.errorThrown);
				},
				progressall: function (e, data) {
					var progress = parseInt(data.loaded / data.total * 100, 10);
					Lstd.Weblets.stdProgressBar.value(pb, progress);
				}
			});
		});
	},
	/**
	 * Returns the HTTP request url
	 * @param [string] Upload WAM name
	 * @param [string] Upload webroutine name
	 * @param [string] Form name
	 */
	httpRequest: function(uploadWamName, uploadWrName, formName) {
		var req = Lstd.HTTP.Form(formName, window.document);
		req.wam = uploadWamName;
		req.webroutine = uploadWrName;
		return req;
	},
	/**
	 * Creates an upload button for a file
	 * @param [string] Button class
	 * @param [string] Progress bar id
	 * @param [function] Fail callback
	 */
	uploadBtnFactory: function(btnClass, pb, failCB) {
		var $uploadBtn = jQuery("<button class=\"ui-btn ui-btn-icon-left ui-icon-arrow-r ui-btn-inline\"/>").addClass(btnClass);

		$uploadBtn.text(Lstd.I18n.getString("Upload"));

		$uploadBtn.on('click', function (e) {
			e.preventDefault();
			var $this = jQuery(this),
				data = $this.data();

			$this.off('click');
			$uploadBtn.text(Lstd.I18n.getString("Abort"));
			$uploadBtn.removeClass("ui-icon-arrow-r").addClass("ui-icon-delete");
			$this.on('click', function () {
				$this.remove();
				data.abort();
			});

			Lstd.Weblets.stdProgressBar.start(pb);

			data.submit()
				.fail(function() {
					jQuery("<span class=\"ui-btn ui-btn-icon-notext ui-btn-inline ui-btn-icon-left ui-icon-delete\" style=\"cursor:default;\"/>").appendTo($this.parent());
				})
				.done(function() {
					jQuery("<span class=\"ui-btn ui-btn-icon-notext ui-btn-inline ui-btn-icon-left ui-icon-check\" style=\"cursor:default;\" />").appendTo($this.parent());
				})
				.always(function () {
				Lstd.Weblets.stdProgressBar.stop(pb);
				$this.remove();
			});
		});
		return $uploadBtn;
	},
	/**
	 * Handles upload failure
	 * @param [function] Fail callback
	 * @param [object] Event object
	 * @param [string] XHR response text
	 * @param [string] Error thrown
	 */
	fail: function(failCB, e, responseText, errorThrown) {
		if (typeof failCB == "function") {
			var wr = null;

			if (responseText) {
				try {
					var o = jQuery.parseJSON(responseText);
					if (Lstd.Json.isWebroutine(o)) {
						wr = Lstd.Json.factory(o);
					}
				}
				catch (err) {
					console.error(err);
				}
			}

			if (wr == null) {
				wr = Lstd.Json.factory(),
				msgs = wr.messages();
				msgs.add(errorThrown);
			}

			try {
				failCB(null, wr);
			}
			catch (err) {
				console.error(err);
			}
		}
	}
};