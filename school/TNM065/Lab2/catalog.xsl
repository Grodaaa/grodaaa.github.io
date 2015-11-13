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
	      				<a href='<xsl:value-of select="link"/>'> 
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



  </body>
  
  </html>
</xsl:template> 


  
</xsl:stylesheet>

