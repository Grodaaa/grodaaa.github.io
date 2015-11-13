<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="catalog"> 
<html>
	<!-- Johan Eliasson, johel964 -->
	<!-- Kristina Engström, krien026 -->
  
  <body>
  
      <h1> Books </h1>
      	<ul>
      		<xsl:for-each select="books/book">
	      		<li>
	      			<strong>
		      			<xsl:value-of select="title"/>
		      			:
		      			<xsl:value-of select="publish_date/year"/>
	      				,
	      				<xsl:value-of select="description"/>
		      		</strong>

	  			</li>
  			</xsl:for-each>
      	</ul>



  </body>
  
  </html>
</xsl:template> 


  
</xsl:stylesheet>

