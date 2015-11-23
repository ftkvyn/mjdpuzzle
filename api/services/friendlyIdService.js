exports.findFriendlyId = function(Entity, idSource, cb){

	//ToDo: replace all non letters and non numbers signs,
	//		it nothing left - use just number.
	var friendlyId = idSource
						   .replace(' ', '_')
						   .replace('\\', '_')
						   .replace('/', '_')
						   .replace('.', '_')
						   .toLowerCase();
	friendlyId = encodeURIComponent(friendlyId);

		var findExistingEntity = function(friendlyId, firstCall){
			Entity.findOne({friendlyId:friendlyId})
			.exec(function(err, entity){
				if(entity){
					num = Math.round(Math.random() * 10 + 1);
					if(firstCall){
						friendlyId += '_';	
					}
					friendlyId += num;
					findExistingEntity(friendlyId, false);
				} else{
					return cb(friendlyId);
				}
			});
		}
	findExistingEntity(friendlyId, true);
}
