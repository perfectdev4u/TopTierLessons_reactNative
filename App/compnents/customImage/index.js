import React, {memo, useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import colors from '../../theme/colors';

export default memo(function CustomImage({source, style}) {
  const [loading, setLoading] = useState(false);
  if (source)
    return (
      <View style={{...style, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={style}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          source={source}
        />
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              style={style}
              size="small"
              color={colors.WHITE}
            />
          </View>
        )}
      </View>
    );
  return null;
});
