const FeaturedImage = ( { featuredImageObject, size = 'medium' } ) => {
    const sizes = featuredImageObject.media_details.sizes;
    const selectedSize = sizes[size] || sizes['full']; // fallback to 'full' if the desired size doesn't exist

    const imgURL = selectedSize.source_url;

    return (
        <img id="featuredImg"src={imgURL} alt={featuredImageObject.alt_text} />
    );
}

export default FeaturedImage;
