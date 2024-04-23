import React from "react";

interface NFTArtboardProps {
  nfts: { id: string; imageUrl: string }[]; // Assuming each NFT has an ID and an image URL
}

const NFTArtboard: React.FC<NFTArtboardProps> = ({ nfts }) => {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {" "}
        {nfts.map((nft) => (
          <div key={nft.id} className="card card-compact bg-base-100 shadow-xl">
            <figure className="p-2">
              <img
                src={nft.imageUrl}
                alt={`NFT ${nft.id}`}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">NFT #{nft.id}</h2>
              <p>Some details about the NFT...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTArtboard;
