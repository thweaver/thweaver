<?php include 'header.php' ?>	

		<!--Hero-->
		<div class="hero">
			<div class="hero-container">
				<div class="hero-copy">
					<h1><span>Thomas</span> Weaver</h1>
					<h2>Multidisciplinary* Designer based in  Denver, CO</h2>
					<h3>* &nbsp;
						<span class="home-brag">Product Design</span>
						<span class="home-brag"> UX/UI Design</span>
						<span class="home-brag"> Front End Web Development</span>
						<span class="home-brag"> Responsive Web Design</span>
						<span class="home-brag"> Graphic Design & Branding</span>
						<span class="home-brag"> Art Direction</span>
						<span class="home-brag"> Digital Illustration</span>
						<span class="home-brag"> Brand Development</span>
					</h3>
				</div>
			</div>
			<div class="scroll-prompt">
				<?php include 'img/scroll-prompt.svg' ?>
			</div>
		</div>

		<!--Recent Work-->
		<div class="wrapper">
			<div class="home-work toggle-view">
				<h2>Recent Work</h2>
				<div class="grid home-work-grid">
					<a href="session.php" class="project transition">
						<div class="project-info">
							<h2>Session - iOS App</h2>
							
							<?php include 'img/circle-icon.svg' ?>
						</div>
						<div class="project-info-bg session-info">
							<div></div>
							<div></div>
							<div></div>
						</div>
						<div class="project-image">
							<img src="img/work/session/project-thumb.jpg">
						</div>
					</a>
					<a href="beta.php" class="project transition ">
						<div class="project-info">
							<h2>Beta Nightclub - Website Redesign</h2>
							
							<?php include 'img/circle-icon.svg' ?>
						</div>
						<div class="project-info-bg beta-info">
							<div></div>
							<div></div>
							<div></div>
						</div>
						<div class="project-image">
							<img src="img/work/beta/project-thumb.jpg">
						</div>
					</a>
					<a href="doormngr.php" class="project transision ">
						<div class="project-info">
							<h2>Doormngr - iOS App</h2>
							
							<?php include 'img/circle-icon.svg' ?>
						</div>
						<div class="project-info-bg doormngr-info">
							<div></div>
							<div></div>
							<div></div>
						</div>
						<div class="project-image">
							<img src="img/work/doormngr/project-thumb.jpg">
						</div>
					</a>
				</div>
				<a href="work.php" class="view-all transition">
					<span>View More Projects</span>
					<?php include 'img/circle-icon.svg' ?>
				</a>
			</div>
		</div>
		
		<!--About Footer-->
		<div class="about-footer ">
			<p class="about-footer-copy toggle-view">
				Hey! Im Thomas, and for the past 11 years I have helped bridge the gap between business goals and user needs, working seamlessly between design and dev to bring ideas to life. When I’m working on a project, I like to be involved every step of the way, ensuring design standards and brand consistency. 
			</p>
			<div class="about-footer-buttons toggle-view">
				<div>
					<a href="contact.php">
						<span>Get In Touch</span>
						<?php include 'img/circle-icon.svg' ?>
					</a>
				</div>
				<div>
					<a href="profile.php">
						<span>More About Me</span>
						<?php include 'img/circle-icon.svg' ?>
					</a>
				</div>
			</div>
		</div>



		<?php include 'footer.php' ?>