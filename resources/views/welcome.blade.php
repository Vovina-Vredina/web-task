<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="UTF-8">
	<title>Luxury Restaurant</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css?family=Playfair+Display:700|Sintony:400,700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="{{ URL::asset('assets/css/style.css') }}">

</head>
<body>

	<header id="header" class="header">
		<div class="main_header">
			<div class="container">
				<div class="row">
					<div class="col-lg-3">
						<img src="{{ URL::asset('assets/img/logo.png') }}" class="logo" alt="Luxury buckwheat">
					</div>
					<div class="col-lg-5">
						<nav>
							<ul class="menu d-flex justify-content-between">
								<li class="menu_item">
									<a href="#about">
										ABOUT BUCKWHEAT
									</a>
								</li>
								<li class="menu_item">
									<a href="#special">
										PRICE
									</a>
								</li>
								<li class="menu_item">
									<a href="#footer">
										CONTACTS
									</a>
								</li>
							</ul>
						</nav>
					</div>
					<div class="col-lg-4">
						<button class="book cta d-flex justify-content-center float-right">
							<span class="book_icon"> </span>
							Book your table
						</button>
					</div>
				</div>
			</div>	
		</div>

		<div class="offer">
			<div class="container">
				<div class="row">
					<div class="col-lg-12 float-right">
						<div class="title">
							<h1 class="title_heading">
								From <span>buckwheat</span> and millet <br>and porridge and paste
							</h1>
							<p class="title_desc">
								(UA, 1955, 104; 1963,251; IMFE, 1-5, 461, 123).
							</p>
						</div>
					</div>
				</div>
			</div>	
		</div>
	</header>

	<section id="about" class="about">
		<div class="line_between"></div>
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<div class="history">
						<h2 class="history_title">
							ABOUT BUCKWHEAT
						</h2>
						<p class="history_text">
							Buckwheat is one of the few cereals that contains choline, a B-vitamin necessary for the nervous system to function. Some scientists believe that buckwheat even reduces the risk of cancer due to its high concentration of flavonoids. These substances inhibit the growth of cancer cells.
						</p>
						<div class="cta video_button">
							Watch the video
						</div>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="food-images food-images-down">
						<img src="{{ URL::asset('assets/img/food1.jpg') }}" alt="Pasta" class="food-images_item">
						<img src="{{ URL::asset('assets/img/food2.jpg') }}" alt="Chicken" class="food-images_item">
					</div>
				</div>
				<div class="col-lg-3">
					<div class="food-images">
						<img src="{{ URL::asset('assets/img/food3.jpg') }}" alt="Meat" class="food-images_item">
						<img src="{{ URL::asset('assets/img/food4.jpg') }}" alt="Fish" class="food-images_item">
					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="special" class="special">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<h2 class="special-title">
						PRICE
					</h2>
				</div>
			</div>

			<div class="row">
				<div class="col-lg-4">
					<div class="food">
						<img src="{{ URL::asset('assets/img/dish.jpg') }}" alt="shop1" class="food_img img-fluid">
						<h3 class="food_title">
							Shop One
						</h3>
						<p class="food_desc">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.  
						</p>
						<div class="food_details d-flex">
							<div class="food_del">
								Home <span>Delivery</span>
							</div>
							<div class="food_phone">
								1-008 005 006
							</div>
							<!-- <div class="food_price yellow ml-auto">
								<sup><small>$</small></sup>89.00
							</div> -->
						</div>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="food">
						<img src="{{ URL::asset('assets/img/dish.jpg') }}" alt="shop2" class="food_img img-fluid">
						<h3 class="food_title">
							Shop Two
						</h3>
						<p class="food_desc">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.  
						</p>
						<div class="food_details d-flex">
							<div class="food_del">
								Home <span>Delivery</span>
							</div>
							<div class="food_phone">
								1-008 005 006
							</div>
							<!-- <div class="food_price yellow ml-auto">
								<sup><small>$</small></sup>89.00
							</div> -->
						</div>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="food">
						<img src="{{ URL::asset('assets/img/dish.jpg') }}" alt="shop3" class="food_img img-fluid">
						<h3 class="food_title">
							Shop Three
						</h3>
						<p class="food_desc">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
						</p>
						<div class="food_details d-flex">
							<div class="food_del">
								Home <span>Delivery</span>
							</div>
							<div class="food_phone">
								1-008 005 006
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row d-flex justify-content-center">
				<a href="#" class="cta history_button price_button">
					Compare prices
				</a>
			</div>
		</div>
	</section>

	<footer id="footer" class="footer">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<ul class="socials d-flex justify-content-center">
						<li class="socials_item socials_item_fb">
							<a href="#"></a>
						</li>
						<li class="socials_item socials_item_tw">
							<a href="#"></a>
						</li>
						<li class="socials_item socials_item_g">
							<a href="#"></a>
						</li>
				  </ul>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-4">
					<div class="line"></div>
				</div>
				<div class="col-lg-4">
					<div class="credits">
						Orion © 2021
					</div>
				</div>
				<div class="col-lg-4">
					<div class="line"></div>
				</div>
			</div>
		</div>
	</footer>
	<div class="modal2">
		<div class="modal2_overlay">
			<div class="modal2_body">
				<iframe width="100%" height="100%" src="https://www.youtube.com/embed/2lRDSJrSZP0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>
		</div>
	</div>
	<script src="https://code.jquery.com/jquery-3.4.1.js"
 	integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
  	crossorigin="anonymous"></script>
	<script src="{{ URL::asset('assets/js/scripts.js') }}"></script>
</body>
</html>

