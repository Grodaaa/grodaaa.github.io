<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="catalog"> 
<html>
	<!-- Johan Eliasson, johel964 -->
	<!-- Kristina Engström, krien026 -->
  
  <body>
  
    <h1> Books </h1>
		  <p> artiklar 1333 </p>
		  	<ul>
		  		<xsl:for-each select="books/book">
		      		<li>
		      			<strong>
		      				<a href="{link}">
		      					<xsl:value-of select="title"/> 
		      				</a>
			      			:
			      			<xsl:value-of select="publish_date/year"/>
		      				,
		  				</strong>
		      				<xsl:value-of select="description"/>
		  			</li>
					</xsl:for-each>
		  	</ul>

	<h1> Articles </h1>
		<ul>
			<xsl:for-each select="articles/article">
				<li>
					<strong>
		      			<a href='xsl:value-of select="link"'> 
		      				<xsl:value-of select="title"/> 
		      			</a>
	      				:
	      				<xsl:for-each select="author">
		      				<xsl:value-of select="author"/> 
	      					, 
      					</xsl:for-each>
      				</strong>
      					<xsl:value-of select="year"/>
				</li>
			</xsl:for-each>
		</ul>


  </body>
  
  </html>
</xsl:template> 


  
</xsl:stylesheet>

