<p class="portfolio">
<?
$i=0;
foreach ($portfolioArray AS $key=>$array) {
    $i++;
?>
<a rel="prettyPhoto[group]" title="<span class='portfolio-type'>[<?=$array["type"]?>]</span> <?=$array["description"]?>" href="photos/<?=$array["fileName"]?>"><img class="<?if($i==3){$i=0;echo"last";}?>" alt="<?=$array["name"]?>" height="80" width="135" src="thumbs/thumb-<?=str_replace('.jpg', '.png', $array["fileName"])?>" /></a>
<?}?>
</p>