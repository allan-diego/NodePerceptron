/*
 * Imperative implementation of an percepton.
 * Code based on orhandemirel's Java implementation (avaliable at https://gist.github.com/orhandemirel/666270)
 *
 * Author: Allan Diego Silva Lima
 * Professor at Federal Institute of Science, Education and Technology of Pernambuco - Igarassu
 * https://github.com/allan-diego
 *
 */

function train(inputs, outputs, threshold, learningRate, epochs) {

	let numberOffeatures = inputs[0].length;
	let numberOfSamples = outputs.length;
	let weights = []

	console.log("samples:", numberOfSamples)
	console.log("features:", numberOffeatures)
	console.log("epochs:", epochs)

	//radom initialization
	for(let i = 0; i < numberOffeatures; i++) {
	    weights[i] = Math.random()
	}

	let missClassification = -1;

	// for each epoch..
	// but notice how the loops stops if, after an epoch, there are not miss classifications
	for(let i = 0; (i < epochs) && (missClassification != 0); i++) {
		console.log("----------------")
		console.log("epoch:", i)
		
		missClassification = 0
		
		// for each sample
		for(let j = 0; j < numberOfSamples; j++) {
			console.log("sample:", j)
			
			// classify the sample
			let output = classify(weights, inputs[j], threshold)

			console.log("expected class:", outputs[j])
			console.log("returned class:", output)

			let error = outputs[j] - output
			console.log("error:", error)

			if (error != 0) {
				console.log("rebalancing w eights");
				
				// for each feature
				for(let k = 0; k < numberOffeatures; k++) {
					let delta = learningRate * inputs[j][k] * error
					
					// update the weight
					weights[k] = weights[k] + delta
				}
				
				// increases the number of miss classifications
				missClassification = missClassification + 1
			}

			console.log("miss classifications:", missClassification)
		}


	}

	console.log("weights:", weights)
	return weights

}

function classify(weights, sample, threshold) {
	sum = 0.0;

	//console.log(sample)

	for(let i = 0; i < sample.length; i++) {
		sum = sum + (weights[i] * sample[i])
	}

	if(sum > threshold) {
		return 1;
	} else {
		return 0;
	}
}


let inputs = [[0,0],[0,1],[1,0],[1,1]]
let outputs = [0,0,0,1]
let threshold = 0.2

let weights  = train(inputs, outputs, threshold, 0.1, 100)

// notice that in the real world we should not test our perceptron
// with samples that had already been seeing by it
for (let i = 0; i < inputs.length; i++) {
	console.log("################")
	console.log("sample:", inputs[i])
	console.log("expected class:", outputs[i])
	console.log("returned class:", classify(weights, inputs[i], threshold))
}