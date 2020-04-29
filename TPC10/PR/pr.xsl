<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>
                    Project Record
                </title>
                <meta charset="UTF-8"/>  
                <style>
                    * {
                        font-family: Lucida Grande;
                    }
                    
                    div {
                        box-sizing: border-box;
                        text-align: justify;
                        text-justify: inter-word;
                    }
                    
                    .column {
                        float: left;
                        width: 33.33%;
                        padding: 5px;
                    }
                    
                    .row::after {
                        content: "";
                        clear: both;
                        display: table;
                    }
                    
                </style>
            </head>
            <body>
                <xsl:apply-templates/>
                <hr/>
                <p align="center">
                    <xsl:value-of select="format-date(current-date(), '[D01]/[M01]/[Y0001]')"/>
                </p>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="pr">
        <div style="margin:2cm">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    
    <xsl:template match="b">
        <b>
            <xsl:apply-templates/>
        </b>
    </xsl:template>
    
    <xsl:template match="i">
        <i>
            <xsl:apply-templates/>
        </i>
    </xsl:template>
    
    <xsl:template match="u">
        <u>
            <xsl:apply-templates/>
        </u>
    </xsl:template>
    
    <xsl:template match="p">
        <p>
            <xsl:apply-templates/>
        </p>        
    </xsl:template>
    
    <xsl:template match="deliverables">
        <hr/>
        <h2>Deliverables</h2>
        <ol>
            <xsl:apply-templates/>
        </ol>
        
    </xsl:template>
    
    <xsl:template match="deliverable">
        <li>
            <a href="{@path}"><xsl:value-of select="."/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="workteam">
        <hr/>
        <h2>Workteam</h2>
        <div class="row">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="member">
        <div class="column">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="abstract">
        <hr/>
        <h2>Abstract</h2>
        <div>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="meta">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="title">
        <h1 align="center">
            <xsl:value-of select="."/>
        </h1>
    </xsl:template>
    
    <xsl:template match="subtitle">
        <h3 align="center">
            <xsl:value-of select="."/>
        </h3>
    </xsl:template>
    
    <xsl:template match="bdate">
        <h5 align="center"> Begin Date: 
            <xsl:value-of select="."/>
        </h5>
    </xsl:template>
    
    <xsl:template match="edate">
        <h5 align="center"> End Date: 
            <xsl:value-of select="."/>
        </h5>
    </xsl:template>
    
    <xsl:template match="keyname">   
        <p align="left"><xsl:value-of select="."/>
            <span style="float:right;">
                Universidade do Minho
            </span>       
        </p>
    </xsl:template>
    
    <xsl:template match="supervisor">
        <hr/>
        <h2><b>Supervisor</b></h2>
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="homepage">
        <p><b>Homepage:</b><a href="{.}"><xsl:value-of select="."/></a></p>
    </xsl:template>
       
    <xsl:template match="xref">
            <a href="{@url}"><xsl:value-of select="."/></a>
    </xsl:template> 
    
    <xsl:template match="photo">
        <img src="{@path}" alt="{@path}" width="250"/>
    </xsl:template> 
    
    <xsl:template match="name">
        <p><b>Name: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="identifier">
        <p><b>Identifier: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="email"> 
        <p><b>Email: </b><a href="mailto:{.}"><xsl:value-of select="."/></a></p>
    </xsl:template>   
</xsl:stylesheet>