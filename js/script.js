$(document).ready(function () {

    

    if ($("#consultantList").length) {

        $.ajax({
            url: "data/consultants.json",
            method: "GET",
            dataType: "json",

            success: function (data) {

                data.forEach(function (consultant) {

                    let statusClass = "";

                    if (consultant.status === "Müsait") {
                        statusClass = "available";
                    }
                    else if (consultant.status === "Görevde") {
                        statusClass = "busy";
                    }
                    else if (consultant.status === "İzinde") {
                        statusClass = "leave";
                    }

                    $("#consultantList").append(`

                        <div class="col-md-4">

                            <div class="consultant-card">

                                <img src="${consultant.image}" 
                                     alt="${consultant.name}">

                                <h4>${consultant.name}</h4>

                                <p>
                                    <strong>Uzmanlık:</strong>
                                    ${consultant.specialty}
                                </p>

                                <p>
                                    <strong>Deneyim:</strong>
                                    ${consultant.experience} yıl
                                </p>

                                <p>
                                    <strong>Puan:</strong>
                                    ${consultant.rating}
                                </p>

                                <span class="status ${statusClass}">
                                    ${consultant.status}
                                </span>

                            </div>

                        </div>

                    `);
                });
            },

            error: function () {

                $("#consultantList").html(
                    "<p>Danışmanlar yüklenirken hata oluştu.</p>"
                );

            }
        });
    }


    

    function calculatePrice() {

        let eventPrice = Number($("#eventType").val()) || 0;

        let guestCount = Number($("#guestCount").val()) || 0;

        let total = eventPrice;


        if (guestCount > 100) {
            total += (guestCount - 100) * 20;
        }


        
        $(".extra:checked").each(function () {

            total += Number($(this).val());

        });


        $("#totalPrice").text(
            total.toLocaleString("tr-TR") + " TRY"
        );
    }


   

    $("#eventType, #guestCount, .extra").on("change input", function () {

        calculatePrice();

    });



    $(".extra").on("change", function () {

        if ($(".extra:checked").length > 0) {

            $("#extraWarning").text(
                "Ek hizmet seçildi. Toplam fiyat güncellendi."
            );

        }
        else {

            $("#extraWarning").text("");

        }

    });


   

    $("#bookingForm").on("submit", function (e) {

        e.preventDefault();

        let valid = true;


        

        let name = $("#name").val().trim();

        if (name === "") {

            $("#name").addClass("is-invalid");
            valid = false;

        }
        else {

            $("#name").removeClass("is-invalid");
            $("#name").addClass("is-valid");

        }


      

        let email = $("#email").val().trim();

        let emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "" || !emailPattern.test(email)) {

            $("#email").addClass("is-invalid");
            valid = false;

        }
        else {

            $("#email").removeClass("is-invalid");
            $("#email").addClass("is-valid");

        }


       

        let eventType = $("#eventType").val();

        if (eventType === "") {

            $("#eventType").addClass("is-invalid");
            valid = false;

        }
        else {

            $("#eventType").removeClass("is-invalid");
            $("#eventType").addClass("is-valid");

        }


       

        let guestCount = Number($("#guestCount").val());

        if (
            $("#guestCount").val() === "" ||
            guestCount < 1 ||
            guestCount > 500
        ) {

            $("#guestCount").addClass("is-invalid");
            valid = false;

        }
        else {

            $("#guestCount").removeClass("is-invalid");
            $("#guestCount").addClass("is-valid");

        }



        let eventDate = $("#eventDate").val();

        if (eventDate === "") {

            $("#eventDate").addClass("is-invalid");
            valid = false;

        }
        else {

            $("#eventDate").removeClass("is-invalid");
            $("#eventDate").addClass("is-valid");

        }


        

        let budget = Number($("#budget").val());

        if (
            $("#budget").val() === "" ||
            budget <= 0
        ) {

            $("#budget").addClass("is-invalid");
            valid = false;

        }
        else {

            $("#budget").removeClass("is-invalid");
            $("#budget").addClass("is-valid");

        }


        

        if (valid) {

            calculatePrice();

            alert("Rezervasyonunuz başarıyla oluşturuldu!");

        }

    });


    

    $("#name").on("input", function () {

        if ($(this).val().trim() !== "") {

            $(this).removeClass("is-invalid");

        }

    });


    $("#email").on("input", function () {

        let emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailPattern.test($(this).val())) {

            $(this).removeClass("is-invalid");

        }

    });


    $("#eventType").on("change", function () {

        if ($(this).val() !== "") {

            $(this).removeClass("is-invalid");

        }

    });


    $("#guestCount").on("input", function () {

        let value = Number($(this).val());

        if (value >= 1 && value <= 500) {

            $(this).removeClass("is-invalid");

        }

    });


    $("#eventDate").on("change", function () {

        if ($(this).val() !== "") {

            $(this).removeClass("is-invalid");

        }

    });


    $("#budget").on("input", function () {

        if (Number($(this).val()) > 0) {

            $(this).removeClass("is-invalid");

        }

    });

});